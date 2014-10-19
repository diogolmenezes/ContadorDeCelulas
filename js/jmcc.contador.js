var valorLimite = 0; 
	
$(document).ready(function() {
	$(document).keyup(function(e) {
		var tecla = e.which;			
		Processar(tecla);			
	});
	
	$('#txtAmostragem').blur(function() {
		Recalcular();
	});
	
	$('#chkEritroblastos').click(function(){
		Recalcular();
	});
});

function Recalcular()
{
	$( '.contagem' ).each(function(index) {
		CalcularValores($(this).attr('id'));
	});
}

function Processar(tecla)
{
	valorLimite = ($('#txtAmostragem').val() == '') ? 100 : parseInt($('#txtAmostragem').val());

	if(tecla == 90)
		Atribuir('cel-baso');
	if(tecla == 88)
		Atribuir('cel-eosi');
	if(tecla == 67)
		Atribuir('cel-myelo');
	if(tecla == 86)
		Atribuir('cel-meta');
	if(tecla == 66)
		Atribuir('cel-bt');
	if(tecla == 78)
		Atribuir('cel-seg');
	if(tecla == 77)
		Atribuir('cel-linfo');
	if(tecla == 188)
		Atribuir('cel-mono');
	if(tecla == 190)
		Atribuir('cel-blt');
	if(tecla == 191)
		Atribuir('cel-erit');
	if(tecla == 193)
		Atribuir('cel-aux');
	if(tecla == 16)
		Atribuir('cel-aux2');		
}

function Atribuir(id)
{	
	var total = CalcularTotal();
	if(total + 1 <= valorLimite)
	{				
		var valor = parseInt($('#' + id + ' .valor').text());
		var novoValor = valor + 1;
		$('#' + id + ' .valor').text(novoValor);			
		CalcularValores(id);
		$.playSound('som/tick.mp3');
	}
	else
	{
		$.playSound('som/fim.mp3');
	}		
}

function CalcularValores(id)
{	
	var totalContado = CalcularTotal();
	var valor = parseInt($('#' + id + ' .valor').text());			
	
	if(valor == 0)
		$('#' + id + ' .porcentagem').text('0%');
	else
		$('#' + id + ' .porcentagem').text((valor*100)/valorLimite + '%');		
	
	$('#total .valor').text(totalContado);		
	
	if(totalContado == 0)
		$('#total .porcentagem').text('0%');
	else
		$('#total .porcentagem').text((totalContado*100)/valorLimite + '%');
}

function CalcularTotal()
{
	var	contagemTotal = 0;
	
	$( '.contagem .valor' ).each(function( index ) {			
		contagemTotal += parseInt($(this).text());
	});		
	
	// se Eritroblastos não estiver marcado diminui ele do total		
	if($('#chkEritroblastos:checked').val() != 'on')
		contagemTotal-= parseInt($('#cel-erit .valor').text());
		
	return contagemTotal;
}