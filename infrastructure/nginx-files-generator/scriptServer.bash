export MODE=serverdevelop
envsubst < ../../nginx/nginx.conf.server.template > ../../nginx/nginx.conf.serverdevelop

export MODE=servermaster
envsubst < ../../nginx/nginx.conf.server.template > ../../nginx/nginx.conf.servermaster
