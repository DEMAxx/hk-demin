<?php
/*
 Дано дерево файлов и папок в виде многоуровнего массива. Каждому файлу указан его размер
*/

$fileTree = [
    'ProgramFiles' => [
        'MicrosoftOffice' => [
            'Word' => [
                'word.exe' => '30MB',
                'readme.txt' => '125KB'
            ],
            'Excel' => [
                'excel.exe' => '25MB',
                'LICENSE.txt' => '294KB'
            ]
        ],
        'Adobe' => [
            'Photoshop' => [
                'photoshop.exe' => '100MB',
                'manual.pdf' => '50MB'
            ],
            'Reader.exe' => '500KB'
        ],
        'myprogram.exe' => '50KB'
    ],
    'myfile.txt' => '1KB',
    'Documents' => [
        'passport.jpg' => '2MB',
        'readme.txt' => '15KB'
    ]
];

/*
 Напишите функцию обхода дерева без использования рекурсии, а только циклы. Можно использовать goto
 При обходе элемента - функция выводит его название (с нужным отступом с учетом текущего уровня вложенности) и его размер
*/

function walkTree($tree)
{
    $arIteratorLevel = [['tmp' => $tree, 'level' => 0]];

    loop:
    if(empty($arIteratorLevel)){
        return;
    }

    $cur = &$arIteratorLevel[count($arIteratorLevel) - 1];
    $iterator = &$cur['tmp'];
    $level = $cur['level'];


    $key = key($iterator);
    $val = current($iterator);


    if($key === null){
        echo '<pre>';
        var_dump($arIteratorLevel);
        echo '</pre>';
        array_pop($arIteratorLevel);
        goto loop;
    }


    next($iterator);

    echo str_repeat('   ', $level) . $key . (is_array($val) ? "" : " $val") . "<br/>\n";

    if(is_array($val)){
        $arIteratorLevel[] = ['tmp' => $val, 'level' => ++$level];
    }


    goto loop;
}


walkTree($fileTree);
/*
  Должен получиться вывод вида


   ProgramFiles
       MicrosoftOffice
           Word
               Word.exe 30MB
               readme.txt 125KB
           Excel
               excel.exe 25MB
               LICENSE.txt 294KB
       Adobe
           Photoshop
              photoshop.exe 100MB
              manual.pdf 50MB
           Reader.exe 500KB
       myprogram.exe 50KB
   myfile.txt 1KB
   Documents
       passport.jpg 2MB
       readme.txt 15KB
*/  ?>