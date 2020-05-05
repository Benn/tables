<!DOCTYPE html>
<html lang="fr">
<head>
	<title>Tables</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
	<!-- Bootstrap-select -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/i18n/defaults-fr_FR.js"></script>

	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
	<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Aclonica'>

	<link rel="stylesheet" href="style.css">
	<script src="js/includes.js"></script>
</head>
<body>
	<div class="container" id="selectors">
		<div class="row">
			<div class="col">
				<select id="speed" name="speed" class="selectpicker" data-style="btn-info" title="Vitesse" data-selected-text-format="static">
					<option value="7" selected="selected">Facile</option>
					<option value="5">Moyen</option>
					<option value="3">Difficile</option>
				</select>
			</div>
			<div class="col">
				<select id="operation" name="operation" class="selectpicker" data-style="btn-info" title="Operation" data-selected-text-format="static">
					<option value="+" selected="selected">Addition</option>
					<option value="*">Multiplication</option>
					<option value="-">Soustraction</option>
					<option value="/">Division</option>
				</select>
			</div>
			<div class="col">
				<select id="tables" name="tables" class="selectpicker" multiple data-style="btn-info" data-actions-box="true" title="Tables" data-selected-text-format="static">
					<option value="1" selected="selected">1</option>
					<option value="2" selected="selected">2</option>
					<option value="3" selected="selected">3</option>
					<option value="4" selected="selected">4</option>
					<option value="5" selected="selected">5</option>
					<option value="6" selected="selected">6</option>
					<option value="7" selected="selected">7</option>
					<option value="8" selected="selected">8</option>
					<option value="9" selected="selected">9</option>
					<option value="10" selected="selected">10</option>
				</select>
			</div>
		</div>
	</div>
	<div class="container-fluid">
		<div class="">
			<button class="btn btn-info btn-lg" status="paused" id="pause">Démarrer</button>
			<button class="btn btn-info btn-lg" id="reset">Reset</button>
			<button class="btn btn-info btn-lg" id="displayTimes">Afficher Moyennes</button>
		</div>
	</div>
	<div class="container-fluid">
		<span class="col block text-responsive" id="question"></span>
		<span class="col block">
			<input type="number" id="result" name="result">
		</span>
	</div>
	<div class="container-fluid">
		<img src="images/success.png" class="feedback" id="success" style="display: none;" />
		<img src="images/error.png" class="feedback"  id="error" style="display: none;" />
		<div class="container-fluid" id="timer"></div>
		<div class="progress">
			<div class="progress-bar progress-bar-striped progress-bar-animated" id="progressbar" role="progressbar" style="width: 0%">0%</div>
		</div>
		<div class="container-fluid" id="results"></div>
		<div class="container-fluid" id="legend">
			<span class="container-fluid great"></span>
			<span class="container-fluid ok"></span>
			<span class="container-fluid average"></span>
			<span class="container-fluid poor"></span>
			<span class="container-fluid bad"></span>
		</div>
	</div>
	<div id="presentation">
		<p>J'ai développé ce petit entraînement pour que l'enfant puisse savoir sur quels calculs il a plus de difficultés et s'entraîner dessus plus particulièrement.</p>
		<p>Au fur et à mesure, la probabilité de tomber sur un calcul réussi rapidement diminue pendant que celle de tomber sur un calcul plus délicat augmente (quand toutes les probabilités sont à 0, le jeu s'arrête).</p>
		<p>Si vous avez des remarques, des idées d'amélioration ou simplement si vous voulez me dire que vous avez apprécié, n'hésitez pas à m'envoyer un petit email : <a href="mailto:ben.destrube@gmail.com">Benoît</a></p>
		<p><a href="http://www.benoitmagicien.com">Benoît - Magicien Close-Up</a></p>
	</div>
<?php include_once("analyticstracking.php") ?>
</body>
</html>
