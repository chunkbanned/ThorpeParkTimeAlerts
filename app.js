const axios = require("axios");
let message = "";
let webhookUrl = "";
let pings = "";
function doCheck() {
    let url = "https://queue-times.com/parks/2/queue_times.json";
    message = "";
    axios.get(url).then(resp => {
        console.log("Checking...");
        let coaster_groups = resp.data.lands;
        coaster_groups.forEach(coaster_group => {
            let group = coaster_group.rides;
            group.forEach(coaster => {
                if (coaster.wait_time <= 45) {
                    message = message + `\n${coaster.name} - **${coaster.wait_time.toString()} min**`;
                }
            })
        })
        fetch(webhookUrl,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: 'Coaster Alerts',
                content: pings,
                allowed_mentions: {
                  parse: ['users', 'roles'],
                },
                embeds: [
                  {
                    color: 16265519,
                    title: 'Coaster Alerts',
                    fields: [
                      {
                        name: 'Alerts',
                        value: message,
                      },
                    ],
                    footer: {
                      text: 'This message was sent automatically.',
                    },
                  },
                ],
              }),
            }
          );
    })
}
doCheck();
setInterval(() => {doCheck()}, 210000);
