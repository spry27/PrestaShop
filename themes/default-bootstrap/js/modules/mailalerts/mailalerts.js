/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/

$(document).ready(function() {
	oosHookJsCodeMailAlert();
	$('#oos_customer_email').bind('keypress', function(e) {
		if(e.keyCode == 13)
		{
			addNotification();
			return false;
		}
	});

	$('#oos_customer_email').click(function(e) {
		clearText();
	});

	$('#mailalert_link').click(function(e) {
		e.preventDefault();
		addNotification();
	});
});

function clearText()
{
	if ($('#oos_customer_email').val() == mailalerts_placeholder)
		$('#oos_customer_email').val('');
}

function oosHookJsCodeMailAlert()
{
	$.ajax({
		type: 'POST',
		url: mailalerts_url_check,
		data: 'id_product=' + id_product + ' &id_product_attribute=' + $('#idCombination').val(),
		success: function (msg) {
			if (msg == '0')
			{
				$('#mailalert_link').show();
				$('#oos_customer_email').show();
			}
			else
			{
				$('#mailalert_link').hide();
				$('#oos_customer_email').hide();
			}
		}
	});
}

function  addNotification()
{
	if ($('#oos_customer_email').val() == mailalerts_placeholder)
		return;
	$.ajax({
		type: 'POST',
		url: mailalerts_url_add,
		data: 'id_product=' + id_product + '&id_product_attribute='+$('#idCombination').val()+'&customer_email='+$('#oos_customer_email').val()+'',
		success: function (msg) {
			if (msg == '1') 
			{
				$('#mailalert_link').hide();
				$('#oos_customer_email').hide();
				$('#oos_customer_email_result').html(mailalerts_registered);
				$('#oos_customer_email_result').css('color', 'green').show();
			}
			else if (msg == '2' )
			{
				$('#oos_customer_email_result').html(mailalerts_already);
				$('#oos_customer_email_result').css('color', 'red').show();
			} 
			else
			{
				$('#oos_customer_email_result').html(mailalerts_invalid);
				$('#oos_customer_email_result').css('color', 'red').show();
			}
		}
	});
}