(function(window) {
        var $textArea = $('#textarea');
        var $notes = $('#notes');
        if (!('webkitSpeechRecognition' in window)) {
            upgrade();
        } else {
            var recognizing;
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            reset();
            recognition.onend = reset;

            var $textArea = $('#textarea');
            if (!('webkitSpeechRecognition' in window)) {
                upgrade();
            } else {
                var recognizing;
                var recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                reset();
                recognition.onend = reset;

                recognition.onresult = function(event) {
                    // Calculating and saving the cursor position where the text will be displayed
                    var pos = $textArea.getCursorPosition()
                        // Deleting an interim result from the textArea field
                        // Restoring the cursor position
                    $textArea.setCursorPosition(pos);
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            $textArea.insertAtCaret(event.results[i][0].transcript);
                            $notes.append('<p>' + event.results[i][0].transcript + '</p>')
                        }
                    }
                };
            }
          }

            $('#tab2').click(function() {
                $('.hide').addClass('hidden');
                $('#notes').removeClass('hidden');
            });

            $('#tab1').click(function() {
                $('.hide').removeClass('hidden');
                $('#notes').addClass('hidden');
            });
            $('#micContainer').click(function() {
                console.log('Recording!');
                toggleStartStop();
            });
            $(".DriveButtonContainer").click(function() {
                window.location = $(this).find("a").attr("href");
                return false;
            });

            function toggleStartStop() {
                if (recognizing) {
                    recognition.stop();
                    reset();
                } else {
                    recognition.start();
                    recognizing = true;
                }
            }

            function reset() {
                recognizing = false;
            }

            function upgrade() {
                alert("This is 2015! Get Google Chrome and browse the web in style!");
            }

    (function($, undefined) {
        $.fn.getCursorPosition = function() {
            var el = $(this).get(0);
            var pos = 0;
            if ('selectionStart' in el) {
                pos = el.selectionStart;
            } else if ('selection' in document) {
                el.focus();
                var Sel = document.selection.createRange();
                var SelLength = document.selection.createRange().text.length;
                Sel.moveStart('character', -el.value.length);
                pos = Sel.text.length - SelLength;
            }
            return pos;
        };
        $.fn.setCursorPosition = function(pos) {
            if (this.setSelectionRange) {
                this.setSelectionRange(pos, pos);
            } else if (this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                if (pos < 0) {
                    pos = $(this).val().length + pos;
                }
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
        $.fn.insertAtCaret = function(myValue) {
            return this.each(function() {
                var me = this;
                if (document.selection) { // IE
                    me.focus();
                    sel = document.selection.createRange();
                    sel.text = myValue;
                    me.focus();
                } else if (me.selectionStart || me.selectionStart == '0') { // Real browsers
                    var startPos = me.selectionStart,
                        endPos = me.selectionEnd,
                        scrollTop = me.scrollTop;
                    me.value = me.value.substring(0, startPos) + myValue + me.value.substring(endPos, me.value.length);
                    me.focus();
                    me.selectionStart = startPos + myValue.length;
                    me.selectionEnd = startPos + myValue.length;
                    me.scrollTop = scrollTop;
                } else {
                    me.value += myValue;
                    me.focus();
                }
            });
        };
    })(jQuery);

})(window);

/*
Picker Code

var clientId = '740349906161-lroh27hgog3klphgonujcvkodvbecpvo.apps.googleusercontent.com';
var developerKey = 'e8ffffbd0919dabcceff4a5f7f47b521541a6a82';
var accessToken;

var accessToken;

onApiLoad();

function onApiLoad() {
  gapi.load('auth', authenticateWithGoogle);
  gapi.load('picker');
}
function authenticateWithGoogle() {
  window.gapi.auth.authorize({
    'client_id': clientId,
    'scope': ['https://www.googleapis.com/auth/drive']
  }, handleAuthentication);
}
function handleAuthentication(result) {
  if(result && !result.error) {
    accessToken = result.access_token;
    setupPicker();
  }
}
function setupPicker() {
  var picker = new google.picker.PickerBuilder()
    .setOAuthToken(accessToken)
    .setDeveloperKey(developerKey)
    .addView(new google.picker.DocsUploadView())
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    .setCallback(myCallback)
    .build();
  picker.setVisible(true);
}
function myCallback(data) {
  if (data.action == google.picker.Action.PICKED) {
    alert(data.docs[0].name);
  } else if (data.action == google.picker.Action.CANCEL) {
    alert('goodbye');
  }
}*/
//gapi.savetodrive.go();
