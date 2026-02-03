.PHONY: community-local
community-local: tmpdir environment
	npx antora --version | tee tmp/community-local-build.log
	npx antora --stacktrace --log-format=pretty --log-level=info \
		kw-local-community-playbook.yml \
		2>&1 | tee -a tmp/community-local-build.log

.PHONY: dsc-local
dsc-local: tmpdir environment
	bin/switch-prod-comm product | tee tmp/dsc-local-build.log
	npx antora --version | tee -a tmp/dsc-local-build.log
	npx antora --stacktrace --log-format=pretty --log-level=info \
		kw-local-dsc-playbook.yml  2>&1 | tee -a tmp/dsc-local-build.log

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
	npx http-server build-rancher-dsc-local/site -c-1

.PHONY: preview-local-community
preview-local-community:
	npx http-server build-local-community/site -c-1

.PHONY: all
all:

.PHONY: test
test:
