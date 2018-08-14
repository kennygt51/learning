ACCESS_KEY="${1}"
curl -sSLH "Authorization: Bearer ${ACCESS_KEY}" "${2}"
