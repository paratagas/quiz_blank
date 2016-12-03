var result = {
	totalQuestions: 0,
	correctAnswersNum: 0,
	correctAnswers: "0",
	inCorrectAnswersNum: 0,
	inCorrectAnswers: "0",
	correctNumbers: [],
	inCorrectNumbers: []
};

var beginTestButtonClick = function() {
	$$("testField").enable();
	if (currentQuestion > questionsObject.totalAmount) {
		window.location.reload();
	}
};

var resetTestButtonClick = function() {
	window.location.reload();
};

var fillOptionsForRadioQuestions = function() {
	var questionCurrentObject = questionsObject.questions.question1;
	var questionCurrentNumber = questionCurrentObject.questionNumber;
	var questionCorrectAnswer = questionCurrentObject.correctAnswer;

	var questionText = questionCurrentObject.questionText;
	var answer1 = questionCurrentObject.answer1;
	var answer2 = questionCurrentObject.answer2;
	var answer3 = questionCurrentObject.answer3;
	
	var dataForRadioArray = [];
	
	var datafForRadioObj1 = {
		id: 1,
		value: answer1
	};
	var datafForRadioObj2 = {
		id: 2,
		value: answer2
	};
	var datafForRadioObj3 = {
		id: 3,
		value: answer3
	};
	
	dataForRadioArray.push(datafForRadioObj1, datafForRadioObj2, datafForRadioObj3);
	
	return dataForRadioArray;
};

var currentQuestion = 1;
var nextQuestion = 2;

var stopQuestionIteration = function () {
	webix.ui({
			view: "window",
			id: "questions_are_finished_window",
			height: 350,
		    width: 450,
		    left: 750,
		    top: 250,
		    move:true,
		    head: {
				view:"toolbar",
				cols:[
					{
						view:"label", 
						label: pageDesign.questionsAreFinishedHeader, 
					},
					{
						view:"button",
						type:"icon",
						icon:"remove",
						width: 30,
						align: 'right', 
						click: "$$('questions_are_finished_window').close();"
					}
				]
			},
			body: {
				template: pageDesign.questionsAreFinished
			}
		});

		$$("questions_are_finished_window").show();

		$$("correctAnswerButton").enable();
		$$("inCorrectAnswerButton").enable();
		$$("viewInChartButton").enable();

		$$("correctAnswerButton").data.badge = result.correctAnswers;
		$$("correctAnswerButton").refresh();
		$$("inCorrectAnswerButton").data.badge = result.inCorrectAnswers;
		$$("inCorrectAnswerButton").refresh();
		$$("testField").disable();
};

var nextQuestionButtonClick = function() {
	var totalAmountOfQuestions = questionsObject.totalAmount;

	// если вопросы закончились
	// if questions finished
	if (currentQuestion > totalAmountOfQuestions) {
		webix.ui({
			view: "window",
			id: "questions_are_finished_window",
			height: 350,
		    width: 450,
		    left: 750,
		    top: 250,
		    move:true,
		    head: {
				view:"toolbar",
				cols:[
					{
						view:"label", 
						label: pageDesign.questionsAreFinishedHeader, 
					},
					{
						view:"button",
						type:"icon",
						icon:"remove",
						width: 30,
						align: 'right', 
						click: "$$('questions_are_finished_window').close();"
					}
				]
			},
			body: {
				template: pageDesign.questionsAreFinished
			}
		});

		$$("questions_are_finished_window").show();

		$$("correctAnswerButton").enable();
		$$("inCorrectAnswerButton").enable();
		$$("viewInChartButton").enable();

		$$("correctAnswerButton").data.badge = result.correctAnswers;
		$$("correctAnswerButton").refresh();
		$$("inCorrectAnswerButton").data.badge = result.inCorrectAnswers;
		$$("inCorrectAnswerButton").refresh();
		$$("testField").disable();

		//stopQuestionIteration();
		return;
	}

	var objNumber = "question" + currentQuestion;
	var questionCurrentObject = questionsObject.questions[objNumber];
	var questionCurrentNumber = questionCurrentObject.questionNumber;
	var questionCorrectAnswer = questionCurrentObject.correctAnswer;

	var userAnswerValue = $$("answerVariants").getValue();

	if (userAnswerValue == questionCorrectAnswer) {
		result.correctAnswersNum++;
		result.correctAnswers = result.correctAnswersNum.toString();
		result.correctNumbers.push(questionCurrentNumber);
	} else {
		result.inCorrectAnswersNum++;
		result.inCorrectAnswers = result.inCorrectAnswersNum.toString();
		result.inCorrectNumbers.push(questionCurrentNumber);
	}
	
	currentQuestion++;

	// если вопросы закончились
	// if questions finished
	if (nextQuestion > totalAmountOfQuestions) {
		webix.ui({
			view: "window",
			id: "questions_are_finished_window",
			height: 350,
		    width: 450,
		    left: 750,
		    top: 250,
		    move:true,
		    head: {
				view:"toolbar",
				cols:[
					{
						view:"label", 
						label: pageDesign.questionsAreFinishedHeader, 
					},
					{
						view:"button",
						type:"icon",
						icon:"remove",
						width: 30,
						align: 'right', 
						click: "$$('questions_are_finished_window').close();"
					}
				]
			},
			body: {
				template: pageDesign.questionsAreFinished
			}
		});

		$$("questions_are_finished_window").show();

		$$("correctAnswerButton").enable();
		$$("inCorrectAnswerButton").enable();
		$$("viewInChartButton").enable();

		$$("correctAnswerButton").data.badge = result.correctAnswers;
		$$("correctAnswerButton").refresh();
		$$("inCorrectAnswerButton").data.badge = result.inCorrectAnswers;
		$$("inCorrectAnswerButton").refresh();
		$$("testField").disable();

		//stopQuestionIteration();
		return;
	}

	var objNumber = "question" + nextQuestion;

	var questionCurrentObject = questionsObject.questions[objNumber];

	var questionText = questionCurrentObject.questionText;
	var answer1 = questionCurrentObject.answer1;
	var answer2 = questionCurrentObject.answer2;
	var answer3 = questionCurrentObject.answer3;

	var dataForRadioArray = [];
	
	var datafForRadioObj1 = {
		id: 1,
		value: answer1
	};
	var datafForRadioObj2 = {
		id: 2,
		value: answer2
	};
	var datafForRadioObj3 = {
		id: 3,
		value: answer3
	};
	
	dataForRadioArray.push(datafForRadioObj1, datafForRadioObj2, datafForRadioObj3);

	$$("answerVariants").data.options = dataForRadioArray;
	$$("answerVariants").refresh();

	$$("questionText").data.value = questionText;
	$$("questionText").data.label = "<b>" + pageDesign.questionPlaceholder + " " + nextQuestion + "</b>";
	$$("questionText").refresh();
	
	nextQuestion++;
};

var infoButtonClick = function() {
	webix.ui({
		view: "window",
		id: "show_info",
		height: 350,
	    width: 450,
	    left: 550,
	    top: 100,
	    move:true,
	    head: {
			view:"toolbar",
			cols:[
				{
					view:"label", 
					label: pageDesign.infoAboutRulesHeader, 
				},
				{
					view:"button",
					type:"icon",
					icon:"remove",
					width: 30,
					align: 'right', 
					click: "$$('show_info').close();"
				}
			]
		},
		body: {
			template: pageDesign.infoAboutRules
		}
	});

	$$("show_info").show();
};

var correctAnswerButtonClick = function() {
	var correctAnswers = result.correctNumbers.join(', ');

	webix.ui({
		view: "window",
		id: "show_correct_answers",
		height: 350,
	    width: 450,
	    left: 600,
	    top: 150,
	    move:true,
	    head: {
			view:"toolbar",
			cols:[
				{
					view:"label", 
					label: pageDesign.correctAnswers
				},
				{
					view:"button",
					type:"icon",
					icon:"remove",
					width: 30,
					align: 'right', 
					click: "$$('show_correct_answers').close();"
				}
			]
		},
		body: {
			template: pageDesign.youAnsweredCorrect + " " + result.correctAnswers + " " + pageDesign.questionsOf + " " + questionsObject.totalAmount +
			"<br>" +
			pageDesign.correctAnswers + ": " +
			correctAnswers

		}
	});

	$$("show_correct_answers").show();
};

var inCorrectAnswerButtonClick = function() {
	var inCorrectAnswers = result.inCorrectNumbers.join(', ');

	webix.ui({
		view: "window",
		id: "show_inCorrect_answers",
		height: 350,
	    width: 450,
	    left: 650,
	    top: 200,
	    move:true,
	    head: {
			view:"toolbar",
			cols:[
				{
					view:"label", 
					label: pageDesign.wrongAnswers 
				},
				{
					view:"button",
					type:"icon",
					icon:"remove",
					width: 30,
					align: 'right', 
					click: "$$('show_inCorrect_answers').close();"
				}
			]
		},
		body: {
			template: pageDesign.youAnsweredWrong + " " + result.inCorrectAnswers + " " + pageDesign.questionsOf + " " + questionsObject.totalAmount +
			"<br>" +
			pageDesign.wrongAnswers + ": " +
			inCorrectAnswers
		}
	});

	$$("show_inCorrect_answers").show();
};

var showChartButtonClick = function() {
	var my_dataForChart = [
		{
			correctAnswers: result.correctAnswers,
			month: "<b>" + pageDesign.correctChart + "</b>", 
			color: "#ee9e36"
		},
		{ 
			correctAnswers: result.inCorrectAnswers,
			month: "<b>" + pageDesign.wrongChart + "</b>",
			color: "#ee3639" 
		}
	];

	webix.ui({
		view: "window",
		id: "show_chart",
		height: 350,
	    width: 450,
	    left: 220,
	    top: 250,
	    move:true,
	    head: {
			view:"toolbar",
			cols:[
				{
					view:"label", 
					label: pageDesign.viewInChartWindowText, 
				},
				{
					view:"button",
					type:"icon",
					icon:"remove",
					width: 30,
					align: 'right', 
					click: "$$('show_chart').close();"
				}
			]
		},
		body: {
			view: "chart",
            type:"pie3D",
            value:"#correctAnswers#",
            color:"#color#",
            label:"#month#",
            pieInnerText:"#correctAnswers#",
            shadow:0,
            data: my_dataForChart
		}
	});

	$$("show_chart").show();
};