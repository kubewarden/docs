.PHONY: all
all:
	@echo "Available targets:"
	@echo "  community-local            Build the local community docs site for local workstation test"
	@echo "  community-remote           Build the remote community docs site (as would happen on GH)"
	@echo "  community-netlify-preview  Build the community docs site for Netlify preview (as on Netlify)"
	@echo "  preview                    Preview the local community docs site"
	@echo "  dev                        Rebuild on file change and live-reload the browser"
	@echo "  clean                      Clean build artifacts"
	@echo "  checkmake                  Check Makefile for common issues"
	@echo "  environment                Set up the Node.js environment"
	@echo "  tmpdir                     Create temporary directories"

.PHONY: community-local
community-local: tmpdir environment build-community-local

.PHONY: build-community-local
build-community-local:
	npx antora --version | tee tmp/build.log
	npx antora --stacktrace --log-format=pretty --log-level=info \
		kw-local-community-playbook.yml \
		2>&1 | tee -a tmp/build.log
	cd build/site && ln -sf kubewarden/latest latest
	./scripts/generate-redirects.sh \
		build/site \
		admission-controller/1.35/en
	@echo ""
	@echo "If your build was successful, you can preview the site with"
	@echo "'make preview'."
	@echo ""

.PHONY: community-remote
community-remote: tmpdir environment
	npx antora --version | tee tmp/build.log
	npx antora --stacktrace --log-format=pretty --log-level=info \
		kw-remote-community-playbook.yml \
		2>&1 | tee -a tmp/build.log
	cd build/site && ln -sf kubewarden/latest latest
	./scripts/generate-redirects.sh \
		build/site \
		admission-controller/1.35/en

.PHONY: community-netlify-preview
community-netlify-preview: tmpdir environment
	npx antora --version | tee tmp/build.log
	npx antora --attribute build-environment=netlify --stacktrace --log-format=pretty --log-level=info \
		kw-local-community-playbook.yml \
		2>&1 | tee -a tmp/build.log
	cd build/site && ln -sf kubewarden/latest latest
	./scripts/generate-redirects.sh \
		build/site \
		admission-controller/1.35/en


.PHONY: clean
clean:
	rm -rf build*
	rm -rf tmp/*.log

NPM_FLAGS = --no-color --no-progress
.PHONY: environment
environment:
	npm $(NPM_FLAGS) ci || npm $(NPM_FLAGS) install

.PHONY: tmpdir
tmpdir:
	mkdir -p tmp

.PHONY: checkmake
checkmake:
	@if [ $$(which checkmake 2>/dev/null) ]; then \
		checkmake --config=tmp/checkmake.ini Makefile; \
		if [ $$? -ne 0 ]; then echo "checkmake failed"; exit 1; \
		else echo "checkmake passed"; \
		fi; \
	else echo "checkmake not available"; fi

.PHONY: preview
preview:
	npx http-server build/site -c-1

.PHONY: dev
dev: tmpdir environment
	touch tmp/reload-stamp
	npx nodemon \
		--watch docs --watch shared --watch kw-community-docs-supp-files \
		--watch kw-local-community-playbook.yml \
		--ext adoc,yml,hbs,css,js,svg,png \
		--delay 1 \
		--exec "$(MAKE) build-community-local && touch tmp/reload-stamp" & \
	NODEMON_PID=$$!; \
	trap 'kill $$NODEMON_PID 2>/dev/null' EXIT INT TERM; \
	npx browser-sync start \
		--server build/site \
		--files tmp/reload-stamp \
		--no-open --no-ui --no-notify \
		--port 8080

.PHONY: test
test:
