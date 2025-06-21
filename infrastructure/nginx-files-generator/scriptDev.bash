export MODE=localtest
envsubst < ../../nginx/nginx.conf.dev.template > ../../nginx/nginx.conf.localtest

export MODE=localdev
envsubst < ../../nginx/nginx.conf.dev.template > ../../nginx/nginx.conf.localdev

export MODE=localcheckserver
envsubst < ../../nginx/nginx.conf.dev.template > ../../nginx/nginx.conf.localcheckserver