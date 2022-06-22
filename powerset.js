function powerSet(s)
{
    s = s.substring(1, s.length - 1).split(",").reverse();
    let powerS = "{";
    for (let i = 0; i < 2 ** s.length; i++) // doesn't work for 2^65536 but that'll be handled specially anyway
    {
        let binI = i.toString(2);
        binI = binI.padStart(s.length, "0").split("");

        let subset = [];
        for (let j = s.length - 1; j >= 0; j--)
        {
            if (binI[j] == 1)
            {
                subset.push(s[j]);
            }
        }

        powerS += "{" + subset.join("!") + "}";

        if (i != 2 ** s.length - 1)
        {
            powerS += ",";
        }
    }
    powerS += "}";
    return powerS;
}

function powerList(s)
{
    s = s.substring(1, s.length - 1).split(",").reverse();
    let powerS = [];
    for (i = 0; i < 2 ** s.length; i++) // doesn't work for 2^65536 but that'll be handled specially anyway
    {
        let binI = i.toString(2);
        binI = binI.padStart(s.length, "0").split("");

        let subset = [];
        for (let j = s.length - 1; j >= 0; j--)
        {
            if (binI[j] == 1)
            {
                subset.push(s[j]);
            }
        }

        powerS.push("{" + subset.join(",") + "}");
    }
    return powerS;
}

setof65536 = powerList(powerSet(powerSet(powerSet("{{}}")))) // 65536 element list of all elements of the 5th-order power set
                                                             // with some exclamation points instead of commas to prevent bugs
twotothe65536 = 2n ** 65536n

var index = BigInt(0)
function genNextElement()
{
    subset = [];

    indexBin = index.toString(2);
    for (let j = indexBin.length - 1; j >= 0; j--)
    {
        correspondingElement = indexBin.length - j - 1; // start = 0, end = whatever
        if (indexBin[j] == 1)
        {
            subset.push(setof65536[correspondingElement].replace("!", ","));
        }
    }

    index += 1n;
    return "{" + subset.join(",") + "}";
}

function add(n)
{
    addedText = "";
    for (let i = 0; i < n; i++)
    {
        if (index < twotothe65536)
        {
            addedText += genNextElement() + (index != twotothe65536 ? "," : "");
        }
    }

    if (index == twotothe65536)
    {
        addedText += "}";
    }
    document.getElementById("text").innerText += addedText;
}

const body = document.body
const html = document.documentElement

function scrollUpdate()
{
    let pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    let scrollDistance = window.pageYOffset;

    while (pageHeight - scrollDistance < 1000 && index < twotothe65536)
    {
        add(200);
        pageHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        scrollDistance = window.pageYOffset;
    }

    if (index == twotothe65536)
    {
        clearInterval(interval);
    }
}

interval = setInterval(scrollUpdate, 1)