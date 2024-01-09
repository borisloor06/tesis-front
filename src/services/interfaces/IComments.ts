// {
//     "body": "Hey /u/rich_awo, please respond to this comment with the prompt you used to generate the output in this post. Thanks!\n\n^(Ignore this comment if your post doesn't have a prompt.)\n\n***We have a [public discord server](https://discord.gg/rchatgpt). There's a free Chatgpt bot, Open Assistant bot (Open-source model), AI image generator bot, Perplexity AI bot, &#x1F916; GPT-4 bot ([Now with Visual capabilities (cloud vision)!](https://cdn.discordapp.com/attachments/812770754025488386/1095397431404920902/image0.jpg)) and channel for latest prompts.[So why not join us?](https://discord.com/servers/1050422060352024636)***\n\n[**Prompt Hackathon and Giveaway &#x1F381;**](https://www.reddit.com/r/ChatGPT/comments/13z1jyw/more_chatgpt_premium_giveaway_more_chance_to_win/)\n\nPSA: For any Chatgpt-related issues email support@openai.com\n\n\n*I am a bot, and this action was performed automatically. Please [contact the moderators of this subreddit](/message/compose/?to=/r/ChatGPT) if you have any questions or concerns.*",
//     "score": 1,
//     "id": "jng5sox",
//     "subreddit": "ChatGPT",
//     "created": 1686259020,
//     "subreddit_id": "144lfc1",
//     "author": "AutoModerator",
//     "created_date": "2023-06-08 21:17:00"
// }

export default interface IComment {
	body: string;
	score: number;
	id: string;
	subreddit: string;
	created: number;
	subreddit_id: string;
	author: string;
	created_date: string;
}
