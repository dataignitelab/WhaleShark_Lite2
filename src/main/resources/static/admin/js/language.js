// 언어적용 관련...

/*
적용방법

적용할 항목의 data-lang 속성을 작성하고 data-lang 속성 값에 해당하는 메세지를 langs 에 언어별로 정의한다. 
<div data-lang='id'>test</div>

	[<span data-lang='hello'>mjghj</span>]

	<select>

		<option data-lang='all'>all</option>
    </select>
    

*/


var langs = {
    ko: {
      hello: '안녕하세요 여러분!',
      choice: '값 하나를 선택'
    },
    en: {
      hello: 'Hello Everyone!',
      choice: ' choice one only'
    }
};

function lang(id, deftxt)
{
    var lang = getLanguage();

    var txt = langs[lang][id];

    if(langs[lang] === undefined ) return deftxt;
    if(langs[lang][id] === undefined ) return deftxt;

    return langs[lang][id];
}

function updatelang()
{
    var lang = getLanguage();

    $('[data-lang]').each(function() {
        var txt = langs[lang][$(this).data('lang')];
        $(this).html(txt);
    });

}

$(document).ready(function () { updatelang();});

function getLanguage() {
    if(App.lang !== undefined ) return App.lang;
    var lang = (navigator.language || navigator.userLanguage);
    var p = lang.indexOf('-');
    if(p>=0) lang = lang.substring(0,p);
    App.lang = lang;
    return App.lang;
}

function changelang(lang)
{
    App.lang = lang;
    updatelang();
}
