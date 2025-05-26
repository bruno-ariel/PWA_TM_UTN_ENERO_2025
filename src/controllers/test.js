import channelRepository from "../repository/channel.repository.js";
//test
async function test() {
    try {
        const newChannel = await channelRepository.createChannel(1, { name : "test", workspace_id: 1 });
        console.log("Channel created", newChannel);
    }
    catch (error) {
        console.error(error.message);
    }
}

test();