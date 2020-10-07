# 타겟 디렉토리로 이동
cd /home/byeol/javascript-w5-accountbook
# git fetch
git fetch

# checksum 비교
CHECKSUM_HEAD = $(git rev-parse HEAD)
CHECKSUM_MASTER = $(git rev-parse origin/J109)

if [ $CHECKSUM_HEAD != $CHECKSUM_MASTER ]; then
	git pull origin J109
	npm run reload
	pm2 reload all
fi