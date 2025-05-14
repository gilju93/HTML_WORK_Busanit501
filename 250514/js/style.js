document.getElementById('signupForm').addEventListener('submit', function(e){
    // e : event 의 약자, web browser에서 제공해주는 기능도구 객체.
    e.preventDefault(); //기본 제출 동작 막기. (페이지 리로드 방지F5로 생각됨..)


    // FormData 클래스, 클래스는 변수,상수,기능(함수)들의 모음집
    // new FormData() : 클래스를 이용하려면, 생성자 호출 == 초기화를 해야함
    const formData = new FormData(this); //폼데이터 수집

    let output = "";

    // 단일 입력 필드 처리

    output += `유저명 : ${formData.get('username')} \n`

    output += `비밀번호 : ${formData.get('password')} \n`

    const hobbies = formData.getAll('hobby')
    output += `취미 : ${hobbies.join(', ')} \n`

    // const gender = formData.getAll('gender')
    // output += `성별 : ${gender} \n`

    output += `성별 : ${formData.get('gender')} \n`

    output += `나이 : ${formData.get('age')} \n`

    output += `생년월일 : ${formData.get('date')} \n`

    output += `이메일 : ${formData.get('email')} \n`

    const file =formData.get('file')
    output += `첨부파일 : ${ file && file.name ? file.name : '파일없음' } \n`

    //삼항연산자
    // ${} : EL 표기법 (Expresion Language), 특정의 값을 출력 할 때 자주 사용한다.
    // 조건식 : file && file.name ? file.name : '파일없음'
    // ' && = and ' , ' (조건식) ? (TRUE) : (FALSE) '

    output += `출력되는 히든 요소 : ${formData.get('user_id')}`

    // 결과를 화면에 표기하는 부분을 연결시켜 줘야 한다.

    document.getElementById('output').textContent = output
})

// 프로필 이미지 변경시, 미리보기 화면에 나타내기.

document.getElementById('signupForm').file.addEventListener('change',
    function(){
        const file = this.files[0]

        if(file && file.type.startsWith('image/')) {
            // FileReader 클래스, 여러가지 기능이 탑재가 되어있다. 웹에서 지원해줌.
            // 파일을 읽는 도구 : reader
            const reader = new FileReader();
            // reader파일을 읽어오게되면 미리보기 화면에 출력을 할 것이다.
            reader.onload = function (e) {
                // 이미지 미리보기 영역에 이미지 표시

                // e.target.result; 선택된 이미지를 가리킨다.
                document.getElementById('profilePreview').src = e.target.result;                
            }
                reader.readAsDataURL(file)
        }
    }
)


// 호환성 떄문에 바이너리를 base64로 변환하는 것이라면
// 윈도우즈 맥 리눅스 등에서 문자열은 무조건 있는데 바이너리가 없는 것이 있는건가?