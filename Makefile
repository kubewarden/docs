.PHONY: all
all:
	@echo "Available targets:"
	@echo "  community-local            Build the local community documentation site"
	@echo "  preview-local-community    Preview the local community documentation site"
	@echo "  clean                      Clean build artifacts"
	@echo "  checkmake                  Check Makefile for common issues"
	@echo "  environment                Set up the Node.js environment"
	@echo "  tmpdir                     Create temporary directories"

.PHONY: community-local
community-local: tmpdir environment
	npx antora --version | tee tmp/community-local-build.log
	npx antora --stacktrace --log-format=pretty --log-level=info \
		kw-local-community-playbook.yml \
		2>&1 | tee -a tmp/community-local-build.log

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

.PHONY: preview-local-community
preview-local-community:
	npx http-server build-local-community/site -c-1

.PHONY: test
test:
