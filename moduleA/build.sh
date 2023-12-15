# !/bin/sh

# 编译打包
npm install && npm run build:prod


# 生成docker镜像
PROJECT='dms'
SPRINTVERSION=1
DATE=$(date +%Y%m%d%H%M%S)
tag=sprint-1-$(DATE)

while getopts s:p: opt; do
	case $opt in
		s)
			tag=sprint-${OPTARG}-$(DATE)
			;;
		p)
			PROJECT=${OPTARG}
			;;
	esac
done

buildName=artifactory.sanyevi.cn:8081/evicloud-docker-dev/${PROJECT}/dms-lite-web-base:${tag}

docker build -f Dockerfile -t=${buildName} .
docker push ${buildName}


exit 0