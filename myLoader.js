module.exports = function myLoader(item) { // 로더가 읽을 파일이 item으로 전달됩니다. 인자는 리소스 파일의 콘텐츠를 담고 있는 문자열입니다.
    console.log('hello myLoader!');
    return item.replace('console.log(', 'alert(');
}