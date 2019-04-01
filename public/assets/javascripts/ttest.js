$(document).ready(function()
{
    if(!String.prototype.trim)
    {  
        String.prototype.trim = function ()
        {  
                return this.replace(/^\s+|\s+$/g,'');  
        };
    } 

})

function oneSample()
{
    console.log('One Sample!')

    samples_str = document.getElementById('text_samples1').value
    // samples_str = '9.8, 9.9, 10.0, 10.1, 10.2, 9.7, 9.9, 10., 10.1, 10.2' // DEBUG
    samples = samples_str.split(',').map(Number)

    expected_str = document.getElementById('text_samples2').value
    // expected_str = 10 // DEBUG
    expected = parseFloat(expected_str)

    alpha_str = document.getElementById('text_alpha').value
    // alpha = '0.05' // DEBUG
    alpha = parseFloat(alpha_str)

    console.log('samples', samples)
    console.log('expected', expected)
    console.log('alpha', alpha)

    var jstat = this.jStat(samples)
    tscore = jstat.tscore(expected)
    pvalue = jstat.ttest(expected, 1)
    console.log('tscore', tscore)
    console.log('pvalue', pvalue)

    score_div = document.getElementById('score_div')
    if (pvalue < alpha)
    {
        console.log('Null Hypothesis rejected: means are different.')
        score_div.innerHTML = 'Hipótese Nula rejeitada: as médias são diferentes.<br>t-score: '.concat(tscore).concat('<br>p-value: ').concat(pvalue)
    }
    else
    {
        console.log('Null Hypothesis accepted: means are similar.')
        score_div.innerHTML =
        'Amostra: '.concat(samples_str)
        .concat('<br>Valor esperado: ').concat(expected_str)
        .concat('<br>Alfa: ').concat(alpha_str)
        .concat('<br><br>Hipótese Nula aceita: as médias são similares.')
        .concat('<br>t-score: ').concat(tscore)
        .concat('<br>p-value: ').concat(pvalue)
    }
}

function twoSamples()
{
    console.log('Two Samples!')

    samples1 = document.getElementById('text_samples1').value
    // samples1 = '9.8, 9.9, 10.0, 10.1, 10.2, 9.7, 9.9, 10., 10.1, 10.2' // DEBUG
    samples1 = samples1.split(',').map(Number)

    samples2 = document.getElementById('text_samples2').value
    // samples2 = '9.8, 9.9, 10.0, 10.1, 10.2, 9.7, 9.9, 10., 10.1, 10.2' // DEBUG
    samples2 = samples2.split(',').map(Number)

    alpha = document.getElementById('text_alpha').value
    // alpha = '0.05' // DEBUG
    alpha = parseFloat(alpha)

    console.log('samples1', samples1)
    console.log('samples2', samples2)
    console.log('alpha', alpha)

    var jstat = this.jStat(samples1, samples2)
    tscore = jstat.tscore()
    pvalue = jstat.ttest()
    console.log('tscore', tscore)
    console.log('pvalue', pvalue)

    if (pvalue < alpha)
        console.log('Null Hypothesis rejected: means are different.')
    else
        console.log('Null Hypothesis accepted: means are similar.')
}