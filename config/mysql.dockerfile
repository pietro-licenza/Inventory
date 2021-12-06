FROM mysql:8

ENV MYSQL_ROOT_PASSWORD=102030mm

EXPOSE 3306

USER root

HEALTHCHECK --interval=1s --timeout=20s --retries=10 \
CMD mysql_isready -U mysqladmin || exit 1