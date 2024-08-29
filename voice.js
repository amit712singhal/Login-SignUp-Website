let assistantEnabled = false; // Initial state is disabled
let activeFieldId = '';

// Hindi language prompts for login and register fields
const prompts = {
  'login-email': "अपना ईमेल पता दर्ज करें",
  'login-password': "अपना पासवर्ड दर्ज करें",
  'register-username': "अपना नाम दर्ज करें",
  'register-email': "अपना ईमेल पता दर्ज करें",
  'register-password': "अपना पासवर्ड दर्ज करें",
};

// Enable/Disable Button Click Handler
document.getElementById( 'toggleAssistant' ).addEventListener( 'click', function ()
{
  assistantEnabled = !assistantEnabled;
  this.querySelector( '.button-text span:first-child' ).textContent =
    assistantEnabled ? 'Voice Assistant (ON)' : 'Voice Assistant';

  if ( assistantEnabled )
  {
    speak( "नमस्कार, मेरा नाम सुमिता है। इस वेबसाइट को चलाने में मैं आपकी मदद करूँगी।", () => { } );
  } else
  {
    annyang.abort(); // Stop any ongoing recognition
    speak( "अगर मेरी कोई और सहायता चाहिए हो तो बताइएगा।", () => { } );
  }
} );

// Start the TTS prompt
function speak ( text, callback )
{
  responsiveVoice.speak( text, 'Hindi Female', {
    onend: callback
  } );
}

// Capture the speech input and fill the corresponding field
function startRecognition ( fieldId )
{
  if ( !assistantEnabled ) return; // Do nothing if the assistant is disabled

  activeFieldId = fieldId;

  annyang.start( { autoRestart: true, continuous: false } );

  function processSpeech ( phrases )
  {
    if ( phrases && phrases.length > 0 )
    {
      document.getElementById( activeFieldId ).value = phrases[ 0 ];
      annyang.abort(); // Stop listening after successfully capturing speech
      annyang.removeCallback( 'result' ); // Clean up callback
    } else
    {
      annyang.start(); // Restart listening if no result was captured
    }
  }

  annyang.addCallback( 'result', processSpeech );

  annyang.addCallback( 'error', function ()
  {
    // Handle error cases, such as network issues
    annyang.start(); // Restart listening in case of an error
  } );

  annyang.addCallback( 'end', function ()
  {
    // Ensure that listening is restarted if it ends unexpectedly
    annyang.start();
  } );


  speak( prompts[ fieldId ], () =>
  {
    annyang.resume();
  } );
}

// Event listeners for login form fields
document.getElementById( 'login-email' ).addEventListener( 'focus', function ()
{
  startRecognition( 'login-email' );
} );

document.getElementById( 'login-password' ).addEventListener( 'focus', function ()
{
  startRecognition( 'login-password' );
} );

// Event listeners for registration form fields
document.getElementById( 'register-username' ).addEventListener( 'focus', function ()
{
  startRecognition( 'register-username' );
} );

document.getElementById( 'register-email' ).addEventListener( 'focus', function ()
{
  startRecognition( 'register-email' );
} );

document.getElementById( 'register-password' ).addEventListener( 'focus', function ()
{
  startRecognition( 'register-password' );
} );
