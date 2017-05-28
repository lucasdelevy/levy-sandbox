$(document).ready(function()
{
  value = getQueryVariable('value')
  unit = getQueryVariable('unit')
  if (value)
  {
    document.title = 'I just ran ' + value + unit + ' with Run Wild!'
    document.getElementById('value_unit_text').innerHTML = 'I just ran ' + value + unit + ' with Run Wild!'
  }
});

function fixValues()
{
  window.location = "/run-wild?value="+document.getElementById('post_value_tb').value+"\&unit="+document.getElementById('post_unit_dp').value;
}

function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0; i < vars.length; i++)
  {
     var pair = vars[i].split("=");
     if(pair[0] == variable)
      return pair[1];
  }
  return(false);
}
