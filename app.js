const { Client, GatewayIntentBits, Partials, PermissionsBitField } = require('discord.js');

const client = new Client({ 
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
  ,restTimeOffset: 50
  ,partials: [Partials.Channel] });

  const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

  const { joinVoiceChannel, getVoiceConnection, entersState, VoiceConnectionStatus, 
    createAudioResource, StreamType, createAudioPlayer, AudioPlayerStatus, 
    NoSubscriberBehavior, generateDependencyReport } = require("@discordjs/voice");

    const { ActionRowBuilder, MessageActionRow, ButtonBuilder, ButtonStyle, InteractionType, ActivityType } = require('discord.js');

    const sleep2 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const Keyv = require('keyv');
    const axios = require('axios');

    const aryMax = function (a, b) {return Math.max(a, b);}
    const aryMin = function (a, b) {return Math.min(a, b);}

////////////////////////////////////////////////////
    
    const st = "お刺身くんを看病中";
    const ver = "0.0.95.β";

    client.on('ready', () => {
    console.log(`-------------------------------`)
    console.log(`${client.user.tag} is online!`)
    console.log(`${client.user.tag} Version.${ver}`)
    console.log(`Discord.js@v14`)
    console.log(`-------------------------------`)
    client.user.setPresence({ activities: [{ name: `${st} | Ver.${ver} | ping:${client.ws.ping}`, type: ActivityType.PLAYING }],
    status: 'online'});
    });
    
    client.on('ready', () => {
      setInterval(() => {
        client.user.setPresence({ activities: [{ name: `${st} | Ver.${ver} | ping:${client.ws.ping}`, type: ActivityType.PLAYING }],
        status: 'online'});
      }, 2500)
    });

//  const null = new Keyv('sqlite://data-1.sqlite', { table: 'null'})

//消してもいいデータ
const poll_data = new Keyv('sqlite://polldata-1.sqlite', { table: 'poll_data'})
const poll_user_data = new Keyv('sqlite://polldata-1.sqlite', { table: 'poll_data'})

//消しちゃダメなデータ
const question_ch_data = new Keyv('sqlite://data-1.sqlite', { table: 'question_ch_data'})
const ngword_list = new Keyv('sqlite://data-1.sqlite', { table: 'ngword_list'})
const nospam = new Keyv('sqlite://data-1.sqlite', { table: 'nospam'})
const role_agree_data = new Keyv('sqlite://data-1.sqlite', { table: 'role_agree_data'})
const cagatech = new Keyv('sqlite://data-1.sqlite', { table: 'cagatech'})
const cagate_not_access = new Keyv('sqlite://data-1.sqlite', { table: 'cagate_not_access'})
const thread_q_data = new Keyv('sqlite://data-1.sqlite', { table: 'thread_q_data'})
const thread_q_user_data = new Keyv('sqlite://data-1.sqlite', { table: 'thread_q_user_data'})
const channel_mute_data = new Keyv('sqlite://data-1.sqlite', { table: 'channel_mute_data'})
const channel_sp_data = new Keyv('sqlite://data-1.sqlite', { table: 'channel_sp_data'})

cagatech.on('error', e => client.channels.cache.get('998902405917843476').send("eraaaaaaaaaaaa(keyv error)"))

//スラッシュコマンド登録
client.on("messageCreate", async message => {
  if(message.author.bot || !message.guild || message.webhookId || message.system) return;
  if(PermissionsBitField.Flags.Administrator) {
if(message.content === "r!s") {
const data = [{
    name: "help",
    description: "Help command."
  },
  {
    name: "cmd",
    description: "All command."
  },
  {
    name: "agree-button",
    description: "agree button.",
    options: [{
      type: ApplicationCommandOptionType.Role,
      name: "role-agree",
      description: "test",
      required: true,
              }]
  },
  {
    name: "bot-send",
    description: "bot send.",
    options: [{
      type: ApplicationCommandOptionType.String,
      name: "sendmessage",
      description: "send message content.",
      required: true,
              }]
  },
  {
    name: "thread-create",
    description: "thread create command.",
    options: [{
      type: ApplicationCommandOptionType.String,
      name: "thread-name",
      description: "thread name",
      required: true,
              }]
  },
  {
    name: "server",
    description: "admin only command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "category-gate",
      description: "category gate.",
      options: [{
        type: ApplicationCommandOptionType.ROLE,
        name: "role",
        description: "category role.",
        required: true,
                },
                {
                  type: ApplicationCommandOptionType.CHANNEL,
                  name: "channel",
                  description: "categorygate create channel.",
                  required: true,
                },
                {
                  type: ApplicationCommandOptionType.ATTACHMENT,
                  name: "img",
                  description: "categorygate img.",
                  required: true,
                }]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "ngword-add",
                description: "NGword add command.",
                options: [{
                  type: ApplicationCommandOptionType.STRING,
                  name: "ngwords",
                  description: "NGword.",
                  required: true,
                          },]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "ngword-delete",
                description: "NGword delete command.",
                options: [{
                  type: ApplicationCommandOptionType.STRING,
                  name: "ngwords",
                  description: "NGword.",
                  required: true,
                          },]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "ngword-list",
                description: "NGword list.",
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "ngword-reset",
                description: "NGword list reset command.",
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "channel-mute",
                description: "channel mute command.",
                options: [{
                  type: ApplicationCommandOptionType.CHANNEL,
                  name: "channel",
                  description: "No send channel.",
                  required: true,
                          },
                          {
                            type: ApplicationCommandOptionType.ROLE,
                            name: "role",
                            description: "Mute role.",
                            required: true,
                            },
                          {
                          type: ApplicationCommandOptionType.BOOLEAN,
                          name: "mute",
                          description: "True or false.",
                          required: true,
                          }]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "channel-sp",
                description: "sp channel command.",
                options: [{
                  type: ApplicationCommandOptionType.CHANNEL,
                  name: "sp1-channel",
                  description: "sp channel 1.",
                  required: true,
                          },
                          {
                            type: ApplicationCommandOptionType.CHANNEL,
                            name: "sp2-channel",
                            description: "sp channel 2.",
                            required: true,
                                    },
                          {
                          type: ApplicationCommandOptionType.BOOLEAN,
                          name: "sp",
                          description: "True or false.",
                          required: true,
                          }]
              },]
  },
  {
    name: "setup",
    description: "admin only command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "auto",
      description: "setup is auto."
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "on",
                description: "setup all on command.",
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "off",
                description: "setup all off command.",
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "spamban",
                description: "Span auto ban setting command.",
                options: [{
                  type: ApplicationCommandOptionType.BOOLEAN,
                  name: "boolean",
                  description: "true or false.",
                  required: true,
                          },]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "ngword",
                description: "NGword auto delete setting command.",
                options: [{
                  type: ApplicationCommandOptionType.BOOLEAN,
                  name: "boolean",
                  description: "true or false.",
                  required: true,
                          },]
              },]
  },
  {
    name: "user",
    description: "admin only command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "timeout",
      description: "user timeout command.",
      options: [{
        type: ApplicationCommandOptionType.USER,
        name: "timeout-user",
        description: "timeout user.",
        required: true,
                },
                {
                  type: ApplicationCommandOptionType.NUMBER,
                  name: "timeout-minute",
                  description: "Please enter the time.",
                  required: true,
                },
                {
                  type: ApplicationCommandOptionType.STRING,
                  name: "timeout-reason",
                  description: "Please enter a reason.",
                }]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "cancell-timeout",
                description: "user timeout cancell command.",
                options: [{
                  type: ApplicationCommandOptionType.USER,
                  name: "cancell-user",
                  description: "timeout cancell user.",
                  required: true,
                          }]
              }]
  },
  {
    name: "cagate",
    description: "admin only command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "banadd",
      description: "cagate ban command.",
      options: [{
        type: ApplicationCommandOptionType.USER,
        name: "banuser",
        description: "cagate ban user.",
        required: true,
                },
                {
                  type: ApplicationCommandOptionType.CHANNEL,
                  name: "banchannel",
                  description: "cagate ban channel.",
                  required: true,
                }]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "bandelete",
                description: "user timeout cancell command.",
                options: [{
                  type: ApplicationCommandOptionType.USER,
                  name: "notbanuser",
                  description: "cagate ban delete user.",
                  required: true,
                          },
                          {
                            type: "CHANNEL",
                            name: "notbanchannel",
                            description: "cagate delete ban channel.",
                            required: true,
                          }]
              }]
  },
  {
    name: "poll",
    description: "admin only command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "create",
      description: "Poll Create Command.",
      options: [{
        type: ApplicationCommandOptionType.STRING,
        name: "title",
        description: "poll title.",
        required: true,
                },
                {
                  type: ApplicationCommandOptionType.STRING,
                  name: "1",
                  description: "select 1",
                  required: true,
                },
                {
                  type: ApplicationCommandOptionType.STRING,
                  name: "2",
                  description: "select 2",
                  required: true,
                },
                {
                  type: ApplicationCommandOptionType.STRING,
                  name: "3",
                  description: "select 3",
                },
                {
                  type: ApplicationCommandOptionType.STRING,
                  name: "4",
                  description: "select 4",
                }
              ]
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "end",
                description: "Poll Totalization Command.",
                options: [{
                  type: ApplicationCommandOptionType.STRING,
                  name: "messageid",
                  description: "Poll messageID.",
                  required: true,
                          }
                        ]
              }
            ]
  },
  {
    name: "question",
    description: "question command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "setting",
      description: "Poll Create Command.",
      options: [{
        type: ApplicationCommandOptionType.CHANNEL,
        name: "set-ch",
        description: "question channel.",
        required: true,
                },
                {
                  type: ApplicationCommandOptionType.BOOLEAN,
                  name: "true-or-false",
                  description: "true or false question channel.",
                  required: true,
                }
              ]
              }
            ]
  },
  {
    name: "weather",
    description: "weather command.",
    options: [{
      type: ApplicationCommandOptionType.SUB_COMMAND,
      name: "get",
      description: "weather get command."
              },
              {
                type: ApplicationCommandOptionType.SUB_COMMAND,
                name: "setting",
                description: "weather get channel setting command.",
                options: [{
                  type: ApplicationCommandOptionType.CHANNEL,
                  name: "channel",
                  description: "channel.",
                  required: true,
                          }]
              }]
  },
  {
    name: "agosu",
    description: "agosu command.",
    options: [{
      type: ApplicationCommandOptionType.STRING,
      name: "content",
      description: "agosu send content.",
      required: true,
              }]
  }]
await client.application.commands.set(data,`${message.guildId}`)

await message.reply("スラッシュコマンドを更新したよ！")
.catch(e =>
  client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]})); 

  client.channels.cache.get('997754951608586250').send({ embeds: [{
  footer: {
    icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
    text: "Create by : oSsmXun256"
  },
thumbnail: {
  url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900453294141/bot-jj_0002.jpg"
},
  title: `${new Date()} - スラッシュコマンド更新`,
  description: `chID : ${message.channelId}` +
  `\nguildID : ${message.guildId}` +
  `\nUser : ${message.author.username}` +
  `\nmessage : ${message.content}`,
  color: 4303284,
  timestamp: new Date()
}]
})
}}});

//helpcmd
client.on("interactionCreate", async interaction => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'help') {

interaction.reply({ embeds: [{
    footer: {
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      text: "Create by : oSsmXun256"
    },
    author: {
        name: "ヘルプ",
        icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      },
    description: `こちらのbotはTypeScriptで開発している多機能botです。\n現在ベータ版です。`,
    fields: [
{ name: '🔷**コマンド一覧**', value: 'コマンド一覧は```/cmd```で見ることができます！', inline: true
},
{ name: '🔷**公式ウェブサイト**', value: '[怜/多機能bot](https://sites.google.com/view/rei-discordbot/%E3%83%9B%E3%83%BC%E3%83%A0)', inline: true
},
{ name: '🔷**お問い合わせ**', value: '現在お問い合わせはできません！', inline: true
},
{ name: '🔷**このbotの概要**', value: 'このbotは趣味で開発しているbotです。', inline: true
},
{ name: '🔷**初期設定**', value: '初期設定は```/server default```で表示できます！', inline: true
},
{ name: '🔷**Readme**', value: '[Readme](https://cdn.discordapp.com/attachments/998568079254638662/1013768957980835892/readme_ts_v1a.txt)', inline: true
}],
    color: 1430209,
    timestamp: new Date()
  }]
, ephemeral: true
})
}});

//cmd
client.on("interactionCreate", async interaction => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'cmd') {

interaction.reply({ embeds: [{
    footer: {
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      text: "Create by : oSsmXun256"
    },
    author: {
        name: "コマンド一覧",
        icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      },
      description: `🔷:全員使用可能　🔶:管理者のみ使用可能　◆:例外あり`,
    fields: [
{ name: '🔷**ヘルプコマンド**', value: '```/help```', inline: true
},
{ name: '🔷**コマンド一覧**', value: '```/cmd```', inline: true
},
{ name: '🔶**ルール同意ボタン**', value: '```/agree-button```', inline: true
},
{ name: '🔶**タイムアウト**', value: '```/user timeout```', inline: true
},
{ name: '🔶**タイムアウト解除**', value: '```/user cancell-timeout```', inline: true
},
{ name: '🔷**スレッド作成**', value: '```/thread-create```', inline: true
},
{ name: '🔶**質問チャンネル設定**', value: '```/question setting```', inline: true
},
{ name: '🔷**投票作成**', value: '```/poll create```', inline: true
},
{ name: '🔷**投票集計**', value: '```/poll end```', inline: true
},
{ name: '🔷**天気情報**', value: '```/weather get```', inline: true
},
{ name: '🔶**天気時報**', value: '```/weather setting```', inline: true
},
{ name: '🔶**発言不可チャンネル設定**', value: '```/server channel-mute```', inline: true
},
{ name: '🔶**荒らし対策ON/OFFの設定**', value: '```/server spamban```', inline: true
},
{ name: '🔶**NGワードの登録**', value: '```/server ngword-add```', inline: true
},
{ name: '🔶**NGワードの削除**', value: '```/server ngword-delete```', inline: true
},
{ name: '🔷**NGワード一覧**', value: '```/server ngword-list```', inline: true
},
{ name: '🔶**メッセージ転送チャンネル設定**', value: '```/server channel-sp```', inline: true
},
{ name: '🔷**アゴス**', value: '```/agosu```', inline: true
}],
    color: 1430209,
    timestamp: new Date()
  }]
, ephemeral: true
})
}});

//同意ボタン配置
client.on('interactionCreate', async interaction => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'agree-button') {
    const row = new ActionRowBuilder()
      .addComponents(
      new ButtonBuilder()
      .setCustomId('auth')
      .setLabel('👍同意 Agree')
      .setStyle(ButtonStyle.PRIMARY),
      );
  
const agreerole = interaction.options.getRole('role-agree')

const rep = await interaction.reply({ content: '私はサーバーのルールに同意します！\nI agree with the server rules!', components: [row] , fetchReply: true});

role_agree_data.set(`${rep.id}`,`${agreerole.id}`)
  }});

//同意ボタン処理
  client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "auth") {
  
    const addrole = await role_agree_data.get(`${interaction.message.id}`)

    try{

    interaction.member.roles.add(`${addrole}`)

    } catch ( e ) {
      interaction.reply(`エラーが発生しました。内容 : ${e}`)
      return;
    }

    await interaction.reply({
    content: "ロールをあげたよ!",
    ephemeral: true
    })
  }
  });

//スレッド作成
client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;
  
  if (interaction.commandName === 'thread-create') {

const intstring = interaction.options.getString('thread-name')

const channeli = interaction.channel

const thread = await channeli.threads.create({
	name: `${intstring}`,
	autoArchiveDuration: 60,
	reason: `test`,
})

interaction.reply(`Created thread: ${thread.name} \nCreate user name: <@${interaction.user.id}>`);
}});

const cacheWebhooks = new Map();

let sendsetmessage;

async function sendMessage(interaction) {

  const webhook = await getWebhookInChannel(interaction.channel);

  webhook.send({
    content : `${sendsetmessage}`,
    username : "怜 - Rei",
    avatarURL : client.user.avatarURL({ format: 'jpg', size: 512}),
  }).catch(e =>       
   client.users.cache.get('873441689660981258').send({ embeds: [{
     footer: {
       icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
       text: "Create by : oSsmXun256"
     },
   thumbnail: {
     url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"
   },
     title: `${new Date()} - ${e.message}`,
     description: `chID : ${interaction.channelId}` +
     `\nguildID : ${interaction.guildId}`,
     color: 4303284,
     timestamp: new Date()
   }]
   }));
}

async function getWebhookInChannel(channel) {
  //webhookのキャッシュを自前で保持し速度向上
  const webhook = cacheWebhooks.get(channel.id) ?? await getWebhook(channel)
  return webhook;
}

async function getWebhook(channel) {
  //チャンネル内のWebhookを全て取得
  const webhooks = await channel.fetchWebhooks();
  //tokenがある（＝webhook製作者がbot自身）Webhookを取得、なければ作成する
  const webhook = webhooks?.find((v) => v.token) ?? await channel.createWebhook("Bot Webhook");
  //キャッシュに入れて次回以降使い回す
  if (webhook) cacheWebhooks.set(channel.id, webhook);
  return webhook;
}

//sendcmd
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'bot-send') {

const intstring = interaction.options.getString('sendmessage')

sendsetmessage = `${intstring}`;

sendMessage(interaction).catch(e =>       
  client.channels.cache.get('998902405917843476').send({ embeds: [{
    footer: {
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      text: "Create by : oSsmXun256"
    },
  thumbnail: {
    url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"
  },
    title: `${new Date()} - ${e.message}`,
    description: `chID : ${interaction.channelId}` +
    `\nguildID : ${interaction.guildId}`,
    color: 4303284,
    timestamp: new Date()
  }]
  }))

interaction.reply({ embeds: [{
    footer: {
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      text: "Create by : oSsmXun256"
    },
    author: {
        name: "The bot spoke up with this content.",
        icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      },
    description: `${intstring}`,
    color: 4303284,
    timestamp: new Date()
  }]
, ephemeral: true
})
}});

let cauban;

//カテゴリーBAN
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'cagate') {
  if (interaction.options.getSubcommand() === 'banadd') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {
      
      // /cagate banadd <user> <ch>
      
      const uban = interaction.options.getUser('banuser')
      const uchannel = interaction.options.getChannel('banchannel')

      const role = await cagate_not_access.get(`${interaction.guildId} ${uchannel.id}`)
      if(`${role}` === "undefined") {
        cauban = "errortest"
      } else {
        cauban = role
      }

      if(cauban.match(uban.id)) {
        interaction.reply({ content: "既にBANされています。\nBAN解除は`/cagate bandelete <user> <ch>`です。", ephemeral: true});
      } else {
        await cagate_not_access.set(`${interaction.guildId} ${uchannel.id}`, `${cauban} ${uban.id}`)

        interaction.reply({ content: `${uban}のアクセスを禁止しました。`, ephemeral: true });

        const role2 = await cagatech.get(`${interaction.guildId} ${uchannel.id}`)
        if(`${role2}` === "undefined") return;

        uban.roles.remove(`${role2}`)
      }
  } else {
  interaction.reply({ content: "権限が不足しています。", ephemeral: true });
  return;
  }
}}});

//カテゴリーBAN解除
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'cagate') {
  if (interaction.options.getSubcommand() === 'bandelete') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {
      
      // /cagate bandelete <user> <ch>
      
      const uban = interaction.options.getUser('notbanuser')
      const uchannel = interaction.options.getChannel('notbanchannel')

      const role = await cagate_not_access.get(`${interaction.guildId} ${uchannel.id}`);
      if(`${role}` === "undefined"||`${role}` === "errortest") {
      interaction.reply({ content: "誰もBANされていないため実行することができません。", ephemeral: true})
      return;
      }

      if(role.match(uban.id)) {

      const ubann = ` ${uban.id}`

      const rep = role.replace(ubann,"");

      await cagate_not_access.set(`${interaction.guildId} ${uchannel.id}`, `${rep}`)

      interaction.reply({ content: `${uban}のアクセスを許可しました。`, ephemeral: true });
      } else {
      interaction.reply({ content: "既にBAN解除されています。\nBANは`/cagate banadd <user> <ch>`です。", ephemeral: true});
      }
  } else {
  interaction.reply({ content: "権限が不足しています。", ephemeral: true });
  return;
  }
}}});

//カテゴリー参加
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'category-gate') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {
      
      // /server category-gate <role> <ch> <img>
      
      const ro = interaction.options.getRole('role')
      const ch = interaction.options.getChannel('channel')
      const img = interaction.options.getAttachment('img')

      const role = await cagatech.get(`${interaction.guildId} ${ch.id}`)
      if(`${role}` === "undefined") {
      
      const row = new ActionRowBuilder()
      .addComponents(
          new ButtonBuilder()
              .setCustomId('kr1')
              .setLabel(`このカテゴリーに参加`)
              .setStyle(ButtonStyle.PRIMARY),

              new ButtonBuilder()
              .setCustomId('kr2')
              .setLabel(`このカテゴリーから退出`)
              .setStyle(ButtonStyle.SECONDARY),
      );
      
const rep = await client.channels.cache.get(`${ch.id}`).send({ embeds: [{
          title: "Now Loading...",
          color: 4303284,
          timestamp: new Date()
        }]
      , ephemeral: false })

await cagatech.set(`${interaction.guildId} ${ch.id}`, `${ro.id}`)

await rep.edit({ embeds: [{
        image: {
                url: img.url
                },
            color: 4303284,
            timestamp: new Date()
          }]
        , ephemeral: false , components: [row] })

        interaction.reply({ content: `${ch}に${ro}のカテゴリー参加ボタンを設置しました。`, ephemeral: true });
      } else {
        const deldata = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('deletecagatedata')
                .setLabel(`データを削除`)
                .setStyle(ButtonStyle.DANGER),
        );
      interaction.reply({ content: "既に作ってあります。\nそちらのデータを削除する場合は下のボタンを押してください。", ephemeral: true , components: [deldata]});
      }
  } else {
  interaction.reply({ content: "権限が不足しています。", ephemeral: true });
  return;
  }
}}});

//カテゴリーボタン処理
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "kr1") {

const noaccessuser = await cagate_not_access.get(`${interaction.guildId} ${interaction.channelId}`)

if(`${noaccessuser}` === "undefined") {

  const role = await cagatech.get(`${interaction.guildId} ${interaction.channelId}`)
  if(`${role}` === "undefined") return interaction.reply({
  content: "エラーが発生しました。",
  ephemeral: true
  });
  
    interaction.member.roles.add(`${role}`).catch(e => { return interaction.reply("エラーが発生しました。"),
      client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]})});
  
    await interaction.reply({
        content: "カテゴリーに参加したよ！",
        ephemeral: true
    })

} else {

if(noaccessuser.match(interaction.user.id)) {
  await interaction.reply({
    content: "このカテゴリーへの参加権限がありません。",
    ephemeral: true
})
return;
}

const role = await cagatech.get(`${interaction.guildId} ${interaction.channelId}`)
if(`${role}` === "undefined") return interaction.reply({
content: "エラーが発生しました。",
ephemeral: true
});

  interaction.member.roles.add(`${role}`).catch(e => { return interaction.reply("エラーが発生しました。"),
    client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]})});

  await interaction.reply({
      content: "カテゴリーに参加したよ！",
      ephemeral: true
  })

}
}
  });

//カテゴリーボタン処理2
client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "kr2") {

      const role = await cagatech.get(`${interaction.guildId} ${interaction.channelId}`)
      if(`${role}` === "undefined") return interaction.reply({
        content: "エラーが発生しました。",
        ephemeral: true
      });

  interaction.member.roles.remove(`${role}`).catch(e => { return interaction.reply("エラーが発生しました。"),
  client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]})});

  await interaction.reply({
      content: "カテゴリーから退出したよ！",
      ephemeral: true
  })
  }
  });

//カテゴリーボタンデータ削除
  client.on('interactionCreate', async (interaction) => {
    if (interaction.customId === "deletecagatedata") {

await cagatech.set(`${interaction.guildId} ${interaction.channelId}`, `undefined`)

await interaction.reply({
    content: "データを削除しました。",
    ephemeral: true
})
}
});

let re;

//タイムアウト
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'user') {
  if (interaction.options.getSubcommand() === 'timeout') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {
      
      // /user timeout <user> <min> <rea>
      
      const tuserr = interaction.options.getUser('timeout-user')
      const m = interaction.options.getNumber('timeout-minute')
      const rea = interaction.options.getString('timeout-reason')

  const member = interaction.guild.members.cache.get(tuserr.id);

  if(`${rea}` === "undefined") {
    re = "なし";
  } else {
   re = rea;
  }

  member.timeout(Number(m) * 60 * 1000, `${re}`).catch(e => { return interaction.reply("エラーが発生しました。"),
  client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]})});

  interaction.reply({ content: `${m}分、${member}を理由 : ${re} でタイムアウトしました。`, ephemeral: false });
  } else {
  interaction.reply({ content: "権限が不足しています。", ephemeral: true });
  return;
  }
}}});

//タイムアウト解除
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'user') {
  if (interaction.options.getSubcommand() === 'cancell-timeout') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {
      
      // /user timeout <user> <min> <rea>
      
      const tuserr = interaction.options.getUser('cancell-user')

  const member = interaction.guild.members.cache.get(tuserr.id);

  member.timeout(0).catch(e => { return interaction.reply("エラーが発生しました。"),
  client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]})});

  interaction.reply({ content: `${member}のタイムアウトを解除しました。`, ephemeral: false });
  } else {
  interaction.reply({ content: "権限が不足しています。", ephemeral: true });
  return;
  }
}}});

let qnum;

//投票機能
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'poll') {
  if (interaction.options.getSubcommand() === 'create') {
      
      // /poll create <title※> <1※> <2※> <3> <4>

  const title = interaction.options.getString('title')
  const tx1 = interaction.options.getString('1')
  const tx2 = interaction.options.getString('2')
  const tx3 = interaction.options.getString('3')
  const tx4 = interaction.options.getString('4')

  const iname = interaction.user.tag;

const meidd = await interaction.reply({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},title: `Loading...`, ephemeral: false }], fetchReply: true})

const meid = meidd.id

if(`${tx3}` === "null") {

  const btn = new ActionRowBuilder()
  .addComponents(
    [
      new ButtonBuilder()
          .setCustomId('poll1')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("1⃣"),

      new ButtonBuilder()
          .setCustomId('poll2')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("2⃣"),
    ]
    );
  
  qnum = "2"

  await interaction.editReply({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},author: {name: `${iname}`,icon_url: interaction.user.avatarURL({ format: 'jpg', size: 512}),},
    title: `${title}`,
    description: `1⃣ **${tx1}**` + `\n2⃣ **${tx2}**` + `\n\n/poll end messageid: ${meid}`
    ,color: 4303284,timestamp: new Date()}], ephemeral: false , components: [btn]});

} else if(`${tx4}` === "null") {

  const btn = new ActionRowBuilder()
  .addComponents(
    [
      new ButtonBuilder()
          .setCustomId('poll1')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("1⃣"),

      new ButtonBuilder()
          .setCustomId('poll2')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("2⃣"),

      new ButtonBuilder()
          .setCustomId('poll3')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("3⃣"),
    ]
  );

  qnum = "3"

  await interaction.editReply({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},author: {name: `${iname}`,icon_url: interaction.user.avatarURL({ format: 'jpg', size: 512}),},
  title: `${title}`,
  description: `1⃣ **${tx1}**` + `\n2⃣ **${tx2}**` + `\n3⃣ **${tx3}**` + `\n\n/poll end messageid: ${meid}`
  ,color: 4303284,timestamp: new Date()}], ephemeral: false , components: [btn]});

} else {

  const btn = new ActionRowBuilder()
  .addComponents(
    [
      new ButtonBuilder()
          .setCustomId('poll1')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("1⃣"),

      new ButtonBuilder()
          .setCustomId('poll2')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("2⃣"),

      new ButtonBuilder()
          .setCustomId('poll3')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("3⃣"),

      new ButtonBuilder()
          .setCustomId('poll4')
          .setLabel(`に投票`)
          .setStyle(ButtonStyle.SUCCESS)
          .setEmoji("4⃣")
    ]
  );

  qnum = "4"

  await interaction.editReply({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},author: {name: `${iname}`,icon_url: interaction.user.avatarURL({ format: 'jpg', size: 512}),},
  title: `${title}`,
  description: `1⃣ **${tx1}**` + `\n2⃣ **${tx2}**` + `\n3⃣ **${tx3}**` + `\n4⃣ **${tx4}**` + `\n\n/poll end messageid: ${meid}`
  ,color: 4303284,timestamp: new Date()}], ephemeral: false , components: [btn]});

}
await poll_data.set(`${meid}`, `0:1 0:2 0:3 0:4 0:5 0:6 0:7 0:8 ${qnum} ${title}`)
//titleの後にデータを入れるとバグる可能性があるのでtitleは最後！！！
}}
});

let desc_message;

//投票集計
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'poll') {
  if (interaction.options.getSubcommand() === 'end') {

    const mid = interaction.options.getString('messageid')
        const poda1 = await poll_data.get(mid)

        if(`${poda1}` === "undefined") return interaction.reply({ content: "投票データが存在しません。", ephemeral: true});

        const args = poda1.split(" ")
        //空白ごとに分ける

        const qqnum = args[8]

        const qtitile = args[9]
        
        const q1 = args[0].split(":")
        //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)
        const q1n = Number(q1[0])

        const q2 = args[1].split(":")
        //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)
        const q2n = Number(q2[0])

        const q3 = args[2].split(":")
        //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)
        const q3n = Number(q3[0])

        const q4 = args[3].split(":")
        //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)
        const q4n = Number(q4[0])

        const all = q1n + q2n + q3n + q4n
        const q1_parr = q1n / all * 100
        const q2_parr = q2n / all * 100
        const q3_parr = q3n / all * 100
        const q4_parr = q4n / all * 100

        const q1_par = Math.floor(q1_parr * 100) / 100;
        const q2_par = Math.floor(q2_parr * 100) / 100;
        const q3_par = Math.floor(q3_parr * 100) / 100;
        const q4_par = Math.floor(q4_parr * 100) / 100;

        const hairetsu = [q1_par,q2_par,q3_par,q4_par]

        const max = hairetsu.reduce(aryMax);

        if(`${qqnum}` === "2") {

        desc_message = `1⃣:**${q1[0]}票 ${q1_par}%**` + `\n2⃣:**${q2[0]}票 ${q2_par}%**`

        } else if(`${qqnum}` === "3") {

        desc_message = `1⃣:**${q1[0]}票 ${q1_par}%**` + `\n2⃣:**${q2[0]}票 ${q2_par}%**` + `\n3⃣:**${q3[0]}票 ${q3_par}%**`

        } else {

        desc_message = `1⃣:**${q1[0]}票 ${q1_par}%**` + `\n2⃣:**${q2[0]}票 ${q2_par}%**` + `\n3⃣:**${q3[0]}票 ${q3_par}%**` + `\n4⃣:**${q4[0]}票 ${q4_par}%**`

        }

        const regexp = new RegExp(max + '(.*?)', 'g')

        const desc_message2 = desc_message.replace(regexp,"👑 " + max)

        interaction.reply({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},
        title: `${qtitile}` + "\n集計結果",
        description: `${desc_message2}`,
        color: 4303284,timestamp: new Date()}], ephemeral: false})
  }}});

//投票ボタン管理1
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "poll1") {

const datanumber = ":" + "1";

const poda1 = await poll_data.get(`${interaction.message.id}`)
const usadatas = await poll_user_data.get(`${interaction.user.id}`)
if(`${usadatas}` === "undefined") {
  poll_user_data.set(`${interaction.user.id}`, `errortest`)
  await sleep2("20")
}
const usadata = await poll_user_data.get(`${interaction.user.id}`)

const inid = interaction.message.id;

const args = poda1.split(" ")
//空白ごとに分ける

const tempnum2 = args[0].split(":")
//投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

const tearg = Number(tempnum2[0])
//256:1 の256の部分をナンバーに変えてエラーを対処

const tempnum = tearg + 1;
//足す

const poda2 = poda1.replace(`${args[0]}`,`${tempnum}${datanumber}`);
//置き換える

if(usadata.match(`${inid}${datanumber}`)) {

  const tempnum3 = args[0].split(":")
  //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

  const tearg2 = Number(tempnum3[0])
  //256:1 の256の部分をナンバーに変えてエラーを対処
  
  const tempnum4 = tearg2 - 1;
  //足す

  const poda3 = poda1.replace(`${args[0]}`,`${tempnum4}${datanumber}`);
  
  await poll_data.set(`${interaction.message.id}`, `${poda3}`)
  const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
  const usdata = usdata2.replace(`${interaction.message.id}${datanumber}`,"")
  await poll_user_data.set(`${interaction.user.id}`, `${usdata}`)
  
  interaction.reply({ content:"投票を取り消しました。", ephemeral: true })

} else if(usadata.match(`${inid}:2`)) {

    const tempnum3 = args[1].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[1]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:2`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })

  } else if(usadata.match(`${inid}:3`)) {
    
    const tempnum3 = args[2].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[2]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:3`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })

  } else if(usadata.match(`${inid}:4`)) {

    const tempnum3 = args[3].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[3]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:4`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })

  } else {
    await poll_data.set(`${interaction.message.id}`, `${poda2}`)
    const usdata = await poll_user_data.get(`${interaction.user.id}`)
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  }
}});

//投票ボタン管理2
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "poll2") {

const datanumber = ":" + "2";

const poda1 = await poll_data.get(`${interaction.message.id}`)
const usadatas = await poll_user_data.get(`${interaction.user.id}`)
if(`${usadatas}` === "undefined") {
  poll_user_data.set(`${interaction.user.id}`, `errortest`)
  await sleep2("20")
}
const usadata = await poll_user_data.get(`${interaction.user.id}`)

const inid = interaction.message.id

const args = poda1.split(" ")
//空白ごとに分ける

const tempnum2 = args[1].split(":")
//投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

const tearg = Number(tempnum2[0])
//256:1 の256の部分をナンバーに変えてエラーを対処

const tempnum = tearg + 1;
//足す

const poda2 = poda1.replace(`${args[1]}`,`${tempnum}${datanumber}`);
//置き換える

if(usadata.match(`${inid}${datanumber}`)) {

  const tempnum3 = args[1].split(":")
  //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

  const tearg2 = Number(tempnum3[1])
  //256:1 の256の部分をナンバーに変えてエラーを対処
  
  const tempnum4 = tearg2 - 1;
  //足す

  const poda3 = poda1.replace(`${args[1]}`,`${tempnum4}${datanumber}`);
  
  await poll_data.set(`${interaction.message.id}`, `${poda3}`)
  const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
  const usdata = usdata2.replace(`${interaction.message.id}${datanumber}`,"")
  await poll_user_data.set(`${interaction.user.id}`, `${usdata}`)
  
  interaction.reply({ content:"投票を取り消しました。", ephemeral: true })


} else if(usadata.match(`${inid}:1`)) {
    const tempnum3 = args[0].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[0]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:1`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })

  } else if(usadata.match(`${inid}:3`)) {

    const tempnum3 = args[2].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[2]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:3`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  } else if(usadata.match(`${inid}:4`)) {

    const tempnum3 = args[3].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[3]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:4`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  } else {
    await poll_data.set(`${interaction.message.id}`, `${poda2}`)
    const usdata = await poll_user_data.get(`${interaction.user.id}`)
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    interaction.reply({content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
}
}});

//投票ボタン管理
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "poll3") {

const datanumber = ":" + "3";

const poda1 = await poll_data.get(`${interaction.message.id}`)
const usadatas = await poll_user_data.get(`${interaction.user.id}`)
if(`${usadatas}` === "undefined") {
  poll_user_data.set(`${interaction.user.id}`, `errortest`)
  await sleep2("20")
}
const usadata = await poll_user_data.get(`${interaction.user.id}`)

const inid = interaction.message.id

const args = poda1.split(" ")
//空白ごとに分ける

const tempnum2 = args[2].split(":")
//投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

const tearg = Number(tempnum2[0])
//256:1 の256の部分をナンバーに変えてエラーを対処

const tempnum = tearg + 1;
//足す

const poda2 = poda1.replace(`${args[2]}`,`${tempnum}${datanumber}`);
//置き換える

if(usadata.match(`${inid}${datanumber}`)) {

  const tempnum3 = args[2].split(":")
  //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

  const tearg2 = Number(tempnum3[0])
  //256:1 の256の部分をナンバーに変えてエラーを対処
  
  const tempnum4 = tearg2 - 1;
  //足す

  const poda3 = poda1.replace(`${args[2]}`,`${tempnum4}${datanumber}`);
  
  await poll_data.set(`${interaction.message.id}`, `${poda3}`)
  const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
  const usdata = usdata2.replace(`${interaction.message.id}${datanumber}`,"")
  await poll_user_data.set(`${interaction.user.id}`, `${usdata}`)
  
  interaction.reply({ content:"投票を取り消しました。", ephemeral: true })


} else if(usadata.match(`${inid}:1`)) {
    const tempnum3 = args[0].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[0]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:1`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })

  } else if(usadata.match(`${inid}:2`)) {

    const tempnum3 = args[1].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[1]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:2`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  } else if(usadata.match(`${inid}:4`)) {

    const tempnum3 = args[3].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[3]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:4`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  } else {
    await poll_data.set(`${interaction.message.id}`, `${poda2}`)
    const usdata = await poll_user_data.get(`${interaction.user.id}`)
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    interaction.reply({content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
}
}});

//投票ボタン管理
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "poll4") {

const datanumber = ":" + "4";

const poda1 = await poll_data.get(`${interaction.message.id}`)
const usadatas = await poll_user_data.get(`${interaction.user.id}`)
if(`${usadatas}` === "undefined") {
  poll_user_data.set(`${interaction.user.id}`, `errortest`)
  await sleep2("20")
}
const usadata = await poll_user_data.get(`${interaction.user.id}`)

const inid = interaction.message.id

const args = poda1.split(" ")
//空白ごとに分ける

const tempnum2 = args[3].split(":")
//投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

const tearg = Number(tempnum2[0])
//256:1 の256の部分をナンバーに変えてエラーを対処

const tempnum = tearg + 1;
//足す

const poda2 = poda1.replace(`${args[3]}`,`${tempnum}${datanumber}`);
//置き換える

if(usadata.match(`${inid}${datanumber}`)) {

  const tempnum3 = args[3].split(":")
  //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

  const tearg2 = Number(tempnum3[0])
  //256:1 の256の部分をナンバーに変えてエラーを対処
  
  const tempnum4 = tearg2 - 1;
  //足す

  const poda3 = poda1.replace(`${args[3]}`,`${tempnum4}${datanumber}`);
  
  await poll_data.set(`${interaction.message.id}`, `${poda3}`)
  const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
  const usdata = usdata2.replace(`${interaction.message.id}${datanumber}`,"")
  await poll_user_data.set(`${interaction.user.id}`, `${usdata}`)
  
  interaction.reply({ content:"投票を取り消しました。", ephemeral: true })


} else if(usadata.match(`${inid}:1`)) {
    const tempnum3 = args[0].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[0]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:1`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })

  } else if(usadata.match(`${inid}:2`)) {

    const tempnum3 = args[1].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[1]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:2`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  } else if(usadata.match(`${inid}:3`)) {

    const tempnum3 = args[2].split(":")
    //投票数と投票先データを分ける(256:1 256=投票数 1=投票先)

    const tearg2 = Number(tempnum3[0])
    //256:1 の256の部分をナンバーに変えてエラーを対処
    
    const tempnum4 = tearg2 - 1;
    //足す

    const poda3 = poda2.replace(`${args[2]}`,`${tempnum4}${datanumber}`);
    
    await poll_data.set(`${interaction.message.id}`, `${poda3}`)
    const usdata2 = await poll_user_data.get(`${interaction.user.id}`)
    const usdata = usdata2.replace(`${interaction.message.id}:3`,"")
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
  } else {
    await poll_data.set(`${interaction.message.id}`, `${poda2}`)
    const usdata = await poll_user_data.get(`${interaction.user.id}`)
    await poll_user_data.set(`${interaction.user.id}`, `${usdata} ${interaction.message.id}${datanumber}`)
    interaction.reply({ content:"投票しました。\n現在の投票数 : " + `${tempnum}`, ephemeral: true })
}
}});

let ngword_ifgai;

//NGワード登録
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'ngword-add') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

    const ng = interaction.options.getString('ngwords')

    const wordlist = await ngword_list.get(`${interaction.guildId}`)

    if(`${wordlist}` === "undefined") {
      ngword_list.set(`${interaction.guildId}`,` ${ng}`)
      interaction.reply({ content: `NGワードに「${ng}」を追加しました。`, 
      ephemeral: true })
      return;
    }

    const btn = new ActionRowBuilder()
    .addComponents(
      [
        new ButtonBuilder()
            .setCustomId('ngword-t-z')
            .setLabel(`登録する`)
            .setStyle(ButtonStyle.SUCCESS)
      ]
    );

    if(wordlist.match(` ${ng}`)) {
      ngword_ifgai = ng;
      interaction.reply({ content: `ワード「${ng}」は既に登録されている可能性がありますが、登録しますか？\n※登録しない場合はこちらのメッセージを削除してください、`, 
      ephemeral: true ,  components: [btn] })
    } else {
      ngword_list.set(`${interaction.guildId}`,`${wordlist} ${ng}`)
      interaction.reply({ content: `NGワードに「${ng}」を追加しました。`, 
      ephemeral: true })
    }
  } else {
    interaction.reply({ content: `権限が足りません。`, 
    ephemeral: true })
  }}}});

  //NGワード登録ボタン
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "ngword-t-z") {
    const ng = ngword_ifgai;

    const wordlist = await ngword_list.get(`${interaction.guildId}`)

    ngword_list.set(`${interaction.guildId}`,`${wordlist} ${ng}`)
    
    interaction.reply({ content: `NGワードに「${ng}」を追加しました。`, 
    ephemeral: true })
}
});

//NGワード削除
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'ngword-delete') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

    const ng = interaction.options.getString('ngwords')

    const wordlist = await ngword_list.get(`${interaction.guildId}`)

    if(`${wordlist}` === "undefined") {
      interaction.reply({ content: `NGワードがありません。`, 
      ephemeral: true })
      return;
    }

 const rep = wordlist.replace(`${ng} `,"")

 ngword_list.set(`${interaction.guildId}`,`${rep}`)

 interaction.reply({ content: `NGワード「${ng}」を削除しました。`, 
 ephemeral: true })
} else {
  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })
}}}});

//NGワードリスト
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'ngword-list') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

    const wordlist = await ngword_list.get(`${interaction.guildId}`)

    if(`${wordlist}` === "undefined") {
      interaction.reply({ content: `NGワードがありません。`, 
      ephemeral: true })
      return;
    }

 interaction.reply({ content: `登録されているワード : ${wordlist}`, 
 ephemeral: true })
} else {
  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })
}}}});

//NGワードリセット(初期化)
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'ngword-reset') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

 ngword_list.set(`${interaction.guildId}`,`undefined`)

 interaction.reply({ content: `NGワードリストのデータを初期化しました。`, 
 ephemeral: true })
} else {
  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })
}}}});

//荒らし対策
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'spamban') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

const ban = interaction.options.getBoolean('ban')

nospam.set(`${interaction.guildId}`,`${ban}`)

interaction.reply({ content: `登録しました。`, 
ephemeral: true })

} else {
  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })
}}}});

//質問チャンネル設定
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'question') {
  if (interaction.options.getSubcommand() === 'setting') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

const set_ch = interaction.options.getChannel('set-ch')
const tf = interaction.options.getBoolean('true-or-false')

const q = await question_ch_data.get(set_ch.id)

if(`${q}` === "undefined") {

  if(`${tf}` === "true") {
    question_ch_data.set(`${set_ch.id}`,`Debug:thread-ch`)
  
    interaction.reply({ content: `登録しました。`, 
    ephemeral: true })
  } else if(`${tf}` === "false") {
  
    interaction.reply({ content: `登録されていません。`, 
    ephemeral: true })
  }

} else {

if(`${tf}` === "true") {

  interaction.reply({ content: `既に登録されています。`, 
  ephemeral: true })

} else if(`${tf}` === "false") {
  question_ch_data.set(`${set_ch.id}`,`undefined`)

  interaction.reply({ content: `解除しました。`, 
  ephemeral: true })
}}

} else {

  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })

}}}});

const hoges = "hogehoge"

///////////////天気取得///////////////
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'weather') {
  if (interaction.options.getSubcommand() === 'get') {

getWeatherForecast(interaction).catch(e => 
client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]}));

await sleep2("50");

sendWeatherchannelsmessage(interaction).catch(e => 
client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]}));

}}});

const tenkiurl = "https://www.jma.go.jp/bosai/forecast/data/forecast/";
const area = "090000";

const tenkisdatatmp = [];

async function getWeatherForecast(interaction) {
  try {
    const response = await axios.get(`${tenkiurl}${area}.json`);
    var k = 0;
    var k = Number(`${k}`);
    for(const area of response.data[0].timeSeries[0].areas){
        const tenkidata1 = `栃木県${area.area.name}`
        for(const weather of area.weathers){
        const tenkidata2 = `${weather}`

        const tenkidata3 = tenkisdatatmp[hoges]

        if(`${tenkidata3}` === "undefined"||`${tenkidata3}` === "not") {
        tenkisdatatmp[hoges] = `${tenkidata1}\n・今日\n${tenkidata2}`
        } else {
        if(`${k}` === "2"||`${k}` === "5"||`${k}` === "8"||`${k}` === "11") {
        tenkisdatatmp[hoges] = `${tenkidata3}\n\n${tenkidata1}\n・今日\n${tenkidata2}`
        } else {
        if(`${k}` === "1"||`${k}` === "4") {
        tenkisdatatmp[hoges] = `${tenkidata3}\n・明後日\n${tenkidata2}`
        } else {
        tenkisdatatmp[hoges] = `${tenkidata3}\n・明日\n${tenkidata2}`
        }
        }
        var k = Number(`${k}`);
        var k = k + 1;
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function sendWeatherchannelsmessage(interaction) {
const tenki = tenkisdatatmp[hoges]

if(`${tenki}` === "undefined"||`${tenki}` === "not") {
const rp = await interaction.reply({ embeds: [{
  footer: {
    icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
    text: "Create by : oSsmXun256"
  },
  author: {
      name: "3日間の天気",
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
    },
  description: `${tenki}`,
  color: 4303284,
  timestamp: new Date()
}], ephemeral: true })

getWeatherForecast(interaction).catch(e => 
  client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${interaction.channelId}` + `\nguildID : ${interaction.guildId}`, color: 4303284,timestamp: new Date()}]}));

  const tenki2 = tenkisdatatmp[hoges]

await interaction.editReply({ embeds: [{
  footer: {
    icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
    text: "Create by : oSsmXun256"
  },
  author: {
      name: "3日間の天気",
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
    },
  description: `${tenki2}`,
  color: 4303284,
  timestamp: new Date()
}], ephemeral: true 
})

tenkisdatatmp[hoges] = "not"
} else {
  interaction.reply({ embeds: [{
    footer: {
      icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      text: "Create by : oSsmXun256"
    },
    author: {
        name: "3日間の天気",
        icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
      },
    description: `${tenki}`,
    color: 4303284,
    timestamp: new Date()
  }], ephemeral: true })
  tenkisdatatmp[hoges] = "not"
}
}

///////////////天気///////////////
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'weather') {
  if (interaction.options.getSubcommand() === 'setting') {

interaction.reply({ content: "現在作成中です。", ephemeral: true })

}}});

//発言不可チャンネル
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'channel-mute') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

      const ch = interaction.options.getChannel('channel')
      const rid = interaction.options.getRole('role')
      const mute = interaction.options.getBoolean('mute')

const chdata = await channel_mute_data.get(`${ch.id}`)

if(`${chdata}` === "undefined") {
    if(`${mute}` === "true") {

      ch.permissionOverwrites.set([
        {
          id: rid.id,
          deny: ['SEND_MESSAGES']
        }
      ], `コマンドが実行されたため`);

      channel_mute_data.set(`${ch.id}`,"Debug:ch-mute")

      interaction.reply({ content: `${ch} を発言不可にしました。`, 
      ephemeral: true })

    } else if(`${mute}` === "false") {

      interaction.reply({ content: `${ch} は既に発言可能になっています。`, 
      ephemeral: true })

    }
  } else {
    if(`${mute}` === "true") {
      
    interaction.reply({ content: `${ch} は既に発言不可になっています。`, 
    ephemeral: true })
      
          } else if(`${mute}` === "false") {

      ch.permissionOverwrites.set([
        {
          id: rid.id,
          allow: ['SEND_MESSAGES'] // 許可しない権限
        }
        ], `コマンドが実行されたため`);
      
      channel_mute_data.set(`${ch.id}`,"undefined")

      interaction.reply({ content: `${ch} を発言可能にしました。`, 
      ephemeral: true })
      
          }
  }
} else {
  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })
}}}});

//メッセージ転送チャンネル
client.on("interactionCreate", async (interaction) => {
  if (!interaction.type === InteractionType.ApplicationCommand) return;
  
  if (interaction.commandName === 'server') {
  if (interaction.options.getSubcommand() === 'channel-sp') {

    const am = interaction.memberPermissions.has("ADMINISTRATOR")
    if(`${am}` === "true") {

      const ch = interaction.options.getChannel('sp1-channel')
      const ch2 = interaction.options.getChannel('sp2-channel')
      const sp = interaction.options.getBoolean('sp')

const spchdata = await channel_sp_data.get(`${ch.id}`)

if(`${spchdata}` === "undefined") {
    if(`${sp}` === "true") {

      channel_sp_data.set(`${ch.id}`,`${ch2.id}`)

      interaction.reply({ content: `${ch} での発言を ${ch2} に転送するように変更しました。`, 
      ephemeral: true })

    } else if(`${sp}` === "false") {

      interaction.reply({ content: `${ch} での発言は既に ${ch2} に転送されないようになっています。`, 
      ephemeral: true })

    }
  } else {
    if(`${sp}` === "true") {

      interaction.reply({ content: `${ch} での発言は既に ${ch2} に転送されるようになっています。`, 
      ephemeral: true })
      
          } else if(`${sp}` === "false") {
      
      channel_sp_data.set(`${ch.id}`,"undefined")

      interaction.reply({ content: `${ch} での発言を ${ch2} に転送しないように変更しました。`, 
      ephemeral: true })
      
          }
  }
} else {
  interaction.reply({ content: `権限が足りません。`, 
  ephemeral: true })
}}}});

////webhookのキャッシュ
const cacheWebhooks2 = new Map();

let agosend = "hogehoge";

async function sendMessage2(interaction) {

  const webhook = await getWebhookInChannel2(interaction.channel);

  webhook.send({
    content : `${agosend}`,
    username : "アゴス",
    avatarURL : "https://media.discordapp.net/attachments/917365701415690283/998566071349039224/10B1E7D9-C8A3-4C68-B089-A20171F8AA60.jpg?width=499&height=498",
  }).catch(e =>       
   client.users.cache.get('873441689660981258').send({ embeds: [{
     footer: {
       icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
       text: "Create by : oSsmXun256"
     },
   thumbnail: {
     url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"
   },
     title: `${new Date()} - ${e.message}`,
     description: `chID : ${interaction.channelId}` +
     `\nguildID : ${interaction.guildId}`,
     color: 4303284,
     timestamp: new Date()
   }]
   }));
}

async function getWebhookInChannel2(channel) {
  //webhookのキャッシュを自前で保持し速度向上
  const webhook = cacheWebhooks2.get(channel.id) ?? await getWebhook2(channel)
  return webhook;
}

async function getWebhook2(channel) {
  //チャンネル内のWebhookを全て取得
  const webhooks = await channel.fetchWebhooks();
  //tokenがある（＝webhook製作者がbot自身）Webhookを取得、なければ作成する
  const webhook = webhooks?.find((v) => v.token) ?? await channel.createWebhook("Bot Webhook");
  //キャッシュに入れて次回以降使い回す
  if (webhook) cacheWebhooks2.set(channel.id, webhook);
  return webhook;
}

/////////アゴス///////
client.on("interactionCreate", async (interaction) => {

  if (interaction.commandName === 'agosu') {

  const cntnt = interaction.options.getString('content')
  agosend = `${cntnt}`;

  interaction.reply({ content: `アゴスで発言しました。\n内容 : ${cntnt}`, 
  ephemeral: true })

sendMessage2(interaction).catch(e =>       
 client.channels.cache.get('998902405917843476').send({ embeds: [{
   footer: {
     icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
     text: "Create by : oSsmXun256"
   },
 thumbnail: {
   url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"
 },
   title: `${new Date()} - ${e.message}`,
   description: `chID : ${interaction.channelId}` +
   `\nguildID : ${interaction.guildId}`,
   color: 4303284,
   timestamp: new Date()
 }]
 }))
}});

/////////////////////////////////////////////////////////////
//////////////ここから下スラッシュコマンド以外////////////////
/////////////////////////////////////////////////////////////

let mcmd = "test";

    //////////取得URL///////////
    client.on('messageCreate', async message => {
      if(message.author.bot || !message.guild || message.webhookId || message.system) return;
    const cmd3 = "https://discordapp.com/channels"
    const cmd2 = "https://discord.com/channels"
        if(message.content.match(cmd3)||message.content.match(cmd2)) {

        if(message.content.match(cmd3)) {
          mcmd = "https://discordapp.com/channels"
        } else {
          mcmd = "https://discord.com/channels"
        }
    
        var a = `${message.content}`
    
        const [command2, ...args2] = a.slice(mcmd.length).split("/")
        const [se,ch,mee] = args2.map(str => String(str))
    
    const cha = client.channels.cache.get(`${ch}`)
    if(`${cha}` === "undefined") return message.reply("エラーが発生しました。");

    const chh = client.channels.cache.get(`${ch}`).name
    
    const mama = `${mee.toString().length}`;

    const ma = Number(mama);
    
    if(ma > 18) {
    const me = mee.substring(0,19)

       cha.messages.fetch(`${me}`).then(targetMessage => message.channel.send({ embeds: [{
      description: targetMessage.content,
      footer: {
        icon_url: client.user.avatarURL,
        text: `#${chh}`
      },
      author: {
        name: targetMessage.author.username,
        url: `https://discord.com/channels/${se}/${ch}/${me}`,
        icon_url: targetMessage.author.avatarURL({ format: 'jpg', size: 256})
      },
    
      color: 10181046,
      timestamp: new Date()
    }]
    }))
    .catch(e => 
      client.channels.cache.get('998902405917843476').send({ embeds: [{
        footer: {
          icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
          text: "Create by : oSsmXun256"
        },
      thumbnail: {
        url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"
      },
        title: `${new Date()} - ${e.message}`,
        description: `chID : ${message.channelId}` +
        `\nguildID : ${message.guildId}` +
        `\nUser : ${message.author.username}` +
        `\nmessage : ${message.content}`,
        color: 4303284,
        timestamp: new Date()
      }]
      }))

    } else if(`${ma}` === "19") {
      const me = `${mee}`
    
      cha.messages.fetch(`${me}`).then(targetMessage => 
        message.channel.send({ embeds: [{
        description: targetMessage.content,
        footer: {
          icon_url: client.user.avatarURL,
          text: `#${chh}`
        },
        author: {
          name: targetMessage.author.username,
          url: `https://discord.com/channels/${se}/${ch}/${me}`,
          icon_url: targetMessage.author.avatarURL({ format: 'jpg', size: 256})
        },
        color: 10181046,
        timestamp: new Date()
      }]
      }))
      .catch(e => 
        client.channels.cache.get('998902405917843476').send({ embeds: [{
          footer: {
            icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),
            text: "Create by : oSsmXun256"
          },
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"
        },
          title: `${new Date()} - ${e.message}`,
          description: `chID : ${message.channelId}` +
          `\nguildID : ${message.guildId}` +
          `\nUser : ${message.author.username}` +
          `\nmessage : ${message.content}`,
          color: 4303284,
          timestamp: new Date()
        }]
        }))

    } else {
    message.reply("取得に失敗しました。").catch(e =>   
      client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]}));
    }
    }});

let nwms = 0;

//NGワード規制
client.on('messageCreate', async message => {
  if(!message.guild || message.webhookId || message.system || message.author.bot) return;
  const nospams = await nospam.get(`${message.guildId}`);
  if(`${nospams}` === "true"||`${nospams}` === "undefined") {
  if(`${nospams}` === "undefined") {
    nospam.set(`${message.guildId}`,`false`)
    return;
  }
    const ngwordd = await ngword_list.get(`${message.guildId}`);
    const ngword = ngwordd.split(" ")

    nwms = 0;

  if( message.content === "^^block-test")  nwms = nwms + 1 
  if( `${ngword[1]}` === "undefined") return;
  if( message.content.match(ngword[1])&&!(typeof ngword[1] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[2])&&!(typeof ngword[2] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[3])&&!(typeof ngword[3] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[4])&&!(typeof ngword[4] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[5])&&!(typeof ngword[5] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[6])&&!(typeof ngword[6] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[7])&&!(typeof ngword[7] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[8])&&!(typeof ngword[8] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[9])&&!(typeof ngword[9] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[10])&&!(typeof ngword[10] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[11])&&!(typeof ngword[11] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[12])&&!(typeof ngword[12] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[13])&&!(typeof ngword[13] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[14])&&!(typeof ngword[14] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[15])&&!(typeof ngword[15] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[16])&&!(typeof ngword[16] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[17])&&!(typeof ngword[17] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[18])&&!(typeof ngword[18] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[19])&&!(typeof ngword[19] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[20])&&!(typeof ngword[20] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[21])&&!(typeof ngword[21] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[22])&&!(typeof ngword[22] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[23])&&!(typeof ngword[23] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[24])&&!(typeof ngword[24] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[25])&&!(typeof ngword[25] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[26])&&!(typeof ngword[26] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[27])&&!(typeof ngword[27] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[28])&&!(typeof ngword[28] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[29])&&!(typeof ngword[29] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[30])&&!(typeof ngword[30] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[31])&&!(typeof ngword[31] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[32])&&!(typeof ngword[32] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[33])&&!(typeof ngword[33] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[34])&&!(typeof ngword[34] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[35])&&!(typeof ngword[35] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[36])&&!(typeof ngword[36] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[37])&&!(typeof ngword[37] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[38])&&!(typeof ngword[38] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[39])&&!(typeof ngword[39] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[40])&&!(typeof ngword[40] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[41])&&!(typeof ngword[41] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[42])&&!(typeof ngword[42] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[43])&&!(typeof ngword[43] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[44])&&!(typeof ngword[44] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[45])&&!(typeof ngword[45] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[46])&&!(typeof ngword[46] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[47])&&!(typeof ngword[47] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[48])&&!(typeof ngword[48] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[49])&&!(typeof ngword[49] === "undefined")) nwms = nwms + 1
  if( message.content.match(ngword[50])&&!(typeof ngword[50] === "undefined")) nwms = nwms + 1

  if(nwms > 0) {

  const role = message.guild.roles.cache.find(roles => roles.name === 'whitelist')

  if(`${role}` === "undefined") {

    const member = message.guild.members.cache.get(message.author.id);

    member.timeout(10 * 60 * 1000)
    .then(() => message.author.send("NGワードを発したからタイムアウトされたよ!ごめんね!"))
    .catch(e =>   
    client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]}))
    message.author.send({
      embeds: [{
        title: `削除されたメッセージ : ${message.content}`,
        color: 4303284,
        timestamp: new Date()
      }]
  })

    await sleep2("10");
    
    message.delete()
    .catch(e =>   
    client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]}))
    
    message.guild.roles.create({ name: 'whitelist' })
  } else if(!message.member.roles.cache.has(role.id)) {

const member = message.guild.members.cache.get(message.author.id);

member.timeout(10 * 60 * 1000)
.then(() => message.author.send("NGワードを発したからタイムアウトされたよ!ごめんね!"))
.catch(e =>   
client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]}))

message.author.send({
  embeds: [{
    title: `削除されたメッセージ : ${message.content}`,
    color: 4303284,
    timestamp: new Date()
  }]
  })

await sleep2("10");
message.delete()
.catch(e =>   
client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]}))
}
}}});

////////質問システム////////
client.on('messageCreate', async message => {
  if(message.author.bot || !message.guild || message.webhookId || message.system) return;
  const q = await question_ch_data.get(`${message.channelId}`)
  if(`${q}` === "undefined") {
///aaa
  } else {
  const tuid = await thread_q_user_data.get(`${message.author.id} ${message.channelId}`)
  if(`${tuid}` === "undefined") {
    const thread = await message.channel.threads.create({
      name: message.content,
      autoArchiveDuration: 1440,
      reason: 'testaaa',
  })

  console.log("1")

  const row = new ActionRowBuilder()
  .addComponents(
      new ButtonBuilder()
          .setCustomId('threadqdel')
          .setLabel(`スレッドを削除`)
          .setStyle(ButtonStyle.DANGER)
  )

  console.log("2")

  //  スレッドデータ : ユーザーID スレッドのID (元のチャンネルのID)
  //  ユーザーデータ : ユーザーID 元のチャンネルのID (スレッドが立っているかどうか)

  thread_q_data.set(`${message.author.id} ${thread.id}`,`${message.channelId}`)
  thread_q_user_data.set(`${message.author.id} ${message.channelId}`,`1`)

  message.delete()

  console.log("3")

      thread.send({
      embeds: [{
        author: {
          name: `${message.author.username}の質問`,
          icon_url: message.author.avatarURL({ format: 'jpg', size: 512})
        },
        title: `${message.content}`,
        description: "こちらのボタンを押すことで質問スレッドを消すことができます。",
      }],
        color: 4303284,
        timestamp: new Date()
        , components:[row]})

  } else {
    message.delete()
    message.author.send("既に質問スレッドがあります。\n質問をしたい場合はそちらのスレッドを削除してください。")
  }
  }
});

//スレッド削除ボタン
client.on('interactionCreate', async (interaction) => {
  if (interaction.customId === "threadqdel") {
const tid = await thread_q_data.get(`${interaction.user.id} ${interaction.channelId}`)
const tidd = await thread_q_user_data.get(`${interaction.user.id} ${tid}`)

if(`${tid}` === "undefined") {
  if(interaction.memberPermissions.has('ADMINISTRATOR')) {
    interaction.channel.delete()
    interaction.user.send("質問スレッドを**管理者権限で**削除しました。\n質問システムのご利用、ありがとうございました。");
  }

interaction.reply({ content: "エラーが発生しました。", ephemeral: true})

} else {
  interaction.channel.delete()

thread_q_data.set(`${interaction.user.id} ${interaction.channelId}`,`undefined`)
thread_q_user_data.set(`${interaction.user.id} ${tid}`,`undefined`)

interaction.user.send("質問スレッドを削除しました。\n質問システムのご利用、ありがとうございました。");

}
}});

//////////他サーバーに共有///////////
client.on('messageCreate', async message => {
  if(message.author.bot || !message.guild || message.webhookId || message.system) return;
    if(message.content.startsWith("<")) return;
    const sp = await channel_sp_data.get(`${message.channelId}`)
    if(`${sp}` === "undefined") {
      //aaaaa
        } else {
          const cch = await client.channels.cache.get(`${sp}`)
          if(`${cch}` === "undefined") return message.channel.send(`メッセージ転送先の${sp}チャンネルが存在しません。再設定することをおすすめします。`);
          await cch.send({ embeds: [{
            description: `${message.content}`,
            footer: {
              icon_url: client.user.avatarURL,
              text: "Create by : oSsmXun256"
            },
            author: {
              name: `${message.author.username}`,
              icon_url: message.author.avatarURL({ format: 'jpg', size: 256})
            },
            color: 10181046,
            timestamp: new Date()
          }]
          })
          .catch(e =>   
            client.channels.cache.get('998902405917843476').send({ embeds: [{footer: {icon_url: client.user.avatarURL({ format: 'jpg', size: 512}),text: "Create by : oSsmXun256"},thumbnail: {url: "https://cdn.discordapp.com/attachments/962596596665712700/997746900881121340/bot-jj_0001.jpg"},title: `${new Date()} - ${e.message}`,description: `chID : ${message.channelId}` + `\nguildID : ${message.guildId}` + `\nUser : ${message.author.username}` + `\nmessage : ${message.content}` , color: 4303284,timestamp: new Date()}]}));
    }});

//////////日向サーバー///////////
client.on('messageCreate', async message => {
  if(message.author.bot || !message.guild || message.webhookId || message.system) return;
    if(!message.content.startsWith("!")) return;
    if(message.content === "!sp nige" && message.guildId === "964485991635230720") {
      message.channel.send({ embeds: [{
        footer: {
          icon_url: client.user.avatarURL,
          text: "Create by : oSsmXun256"
        },
        title: "日向サーバーのヘルプ",
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/962596596665712700/965239001701310545/DEB63A6B-3F43-4B60-AA65-5ACEF23D25AF.jpg"
        },
        fields: [
          { name: client.user.username + "って誰？", value: 'お刺身くんが運営しているbotです。'
          },
          { name: 'このサーバーは何？', value: '逃げ場所トライブメンバーのサーバーです。'
          },
          { name: '管理者権限ちょーだい', value: '[こちらからどうぞ](https://discord.com/channels/964485991635230720/964957028730683492)'
          }],
        color: 10181046,
        timestamp: new Date()
      }]
      })
   message.delete()
   }});

client.on('messageCreate', async message => {
  if(message.author.id === "873441689660981258"){
  if(message.content.startsWith("!reisend ")) {

    const cnt = message.content.replace("!reisend ","")

    client.channels.cache.get("971353283727867944").send(cnt);
    message.channel.send(cnt + "\n\nを送信しました。");
  }
  }
});

client.login("");