const discord = require( "discord.js" );
const bot = new discord.Client( { partials: [ "MESSAGE", "CHANNEL", "REACTION" ] } );

///

// https://discord.com/api/oauth2/authorize?client_id=913399659177844736&permissions=534723950656&scope=bot

var awlchannel = "913397925613301830"
var checkchannel = "913400300356923392"
var promoted_channels = new Set( [
    "913401234596167690", // awl-memes
] );

///

bot.on( "message", ( msg ) => {
    if ( msg.author.bot ) { return };
    if ( !promoted_channels.has( msg.channel.id ) ) { return };

    var content = msg.content.replace( "@", "" );
    content = content.replace( /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/ug, '' )
    
    if( content.trim().length != 0 & !content.includes( "http" )) { return };
    
    console.log( `Sent meme "${ content }" from ${ msg.author.username }, ${ msg.guild.name }` );

    // \`${ msg.guild.name }\`
    bot.channels.cache.get( checkchannel ).send( `From \`${ msg.author.username }#${ msg.author.discriminator }\`\n   ${ content }` ).then( msg => {
        msg.react( "👍" );
        msg.react( "👎" );
    } ).catch( function() {
        bot.channels.cache.get( checkchannel ).send( "Failed to react" );
    } );
} );

bot.on( "messageReactionAdd", ( react, user ) => {
    if ( user.bot ) { return };
    
    switch ( react.message.channel.id ) { 
        case checkchannel:
            var msg = react.message

            if ( react._emoji.name != "👍" ) {
                msg.delete();

                return
            };

            bot.channels.cache.get( awlchannel ).send( msg.content ).then( msg => {
                msg.react( "👍" );
                msg.react( "👎" );
            } ).catch( function() {
                console.log( "Failed to react" );
            } );

            msg.delete();
        break

        case awlchannel:

        break
    };
} );

///

bot.on( "ready", () => {
    console.log( "awl loaded" );
} );

bot.login( "TOKEN-HERE" );
