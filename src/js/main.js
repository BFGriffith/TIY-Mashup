(function(window) {

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
                }
            }
        };

        // recognition.onstart = function() { ... }
        // recognition.onerror = function(event) { ... }
    }

    $('#test').click(function() {
        console.log('Recording!');
        toggleStartStop();
    });


    gapi.savetodrive.go();


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
