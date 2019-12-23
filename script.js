var quote='';
    quotes=[];
    author='';
    numOfQt = '';


const colorSchemes=[['706698','F3F5F4'],['201F28','E4E6E1'],['DF7B86','FAFAF9'], ['1FABC2','F6F8F7']]
      APIlink = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
      randomNum=(length)=>(Math.floor(Math.random()*length))
async function getQuotes(){
        let fetchedQuotes = await fetch(APIlink)
        .then(data=>data.json())    
        .then(data=>{ 
            quotes = data.quotes;
            numOfQt=data.quotes.length
            return data.quotes
        })
        let rndQtID=randomNum(quotes.length)
        quote=`"${fetchedQuotes[rndQtID].quote}"`
        author=fetchedQuotes[rndQtID].author
}
function getColors(){
    return colorSchemes[Math.floor(Math.random()*colorSchemes.length)]
}
function setQuote(){
    let boxHeight = $('#quote-box').height()
    let quoteBodyHeight =$('#quote-body').height()
    $('#text').text(quote)
    $('#author').text(`- `+author)
    let newQuoteBodyHeight = $('#quote-body').height()
    let newHeight = $('#quote-box').height()
    $('#quote-body').height(quoteBodyHeight)
    $('#quote-box').height(boxHeight)
    $('#quote-box').animate({
        height:newHeight,
    },1000,function(){
        $('#quote-box').height('auto')
    })
    $("#quote-body").css({height:quoteBodyHeight}).animate({
        height: newQuoteBodyHeight
    }, 1000)
    $('#quote-body').animate({
        opacity: 1,
    }, 1000,function(){
        $('#quote-body').height('auto')
    })
    $('#tweet-quote').attr('href',`https://twitter.com/intent/tweet?hashtags=quotes&text=${encodeURIComponent(quote)}${encodeURIComponent(author)}`)
}
async function displayInitialQuote(){
    await getQuotes()
    setQuote()
}

function getNewQuote(){
    let newQtID = randomNum(numOfQt)
    quote = `"${quotes[newQtID].quote}"`
    author = quotes[newQtID].author
  }
function displayNewQuote(){
    getNewQuote()
    let colors = getColors()
    console.log(colors)
    $('.background-1').animate({
        backgroundColor:`#${colors[0]}`,
        color:`#${colors[1]}`
    },1000)
    $('.background-2').animate({
        backgroundColor:`#${colors[1]}`,
        color:`#${colors[0]}`
    },1000)
    $('#quote-body').animate({
        opacity: 0,
    }, 1000, function(){
        setQuote()
    })
    
}
displayInitialQuote()

$('#new-quote').click(function(){
    displayNewQuote()
})