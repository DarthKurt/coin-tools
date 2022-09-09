# Create a container in Azure in the region you want
az group create -n temp-proxy -l northeurope
az container create -g temp-proxy `
                    -n proxy `
                    --image rastasheep/ubuntu-sshd `
                    --ip-address Public `
                    --ports 22 `
                    --dns-name-label tst-proxy `
                    --cpu 0.5 `
                    --memory 0.3

ssh -D 1337 -C -N root@tst-proxy.northeurope.azurecontainer.io

# Do stuff

# Clean up
az group delete -n temp-proxy -y --no-wait