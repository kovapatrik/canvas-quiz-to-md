// ==UserScript==
// @name         Canvas Quiz to Markdown
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       kiráj___arc
// @match        https://canvas.elte.hu/*/submissions/*
// @match        https://canvas.elte.hu/*/quizzes/*/history*
// @require      https://raw.githubusercontent.com/eligrey/FileSaver.js/master/dist/FileSaver.js
// @downloadURL  https://github.com/kovapatrik/canvas-quiz-to-md/raw/master/canvas_quiz_to_md.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let blocks= document.getElementsByClassName('question');

    if (blocks.length > 0) {
        console.log("helo");
        let button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.type = "button";
        button.textContent = "Mentés Markdown-ba";
        button.id = "save-to-md";
        button.addEventListener ("click", save , false);
        let before = document.getElementsByClassName('quiz_score')[0];
        insertAfter(button, before);
    }

    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    function save() {

        let string_to_save = "";

        for (let i = 0; i < blocks.length; i++) {
            let curr_q = blocks[i].getElementsByClassName('text')[0];
            string_to_save += "## " + curr_q.getElementsByClassName('question_text')[0].innerText + "  \n\n";
            let answers = curr_q.querySelectorAll('.answers_wrapper .answer .select_answer');
            for (let j = 0; j < answers.length; j++) {
                let checked = answers[j].children[0].checked;
                if (checked) {
                    string_to_save += "- [x] ";
                } else {
                    string_to_save += "- [ ] ";
                }
                string_to_save += answers[j].children[1].innerText + "  \n";
            }
            string_to_save += "\n\n";
        }

        var blob = new Blob([string_to_save], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "quiz.md");

        return false;
    }
})();