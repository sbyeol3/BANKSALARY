export default {
  defaultOption: '<option selected disabled>선택하세요</option>',
  logForm: `
  <div class='form-section'>
        <form id='log-form' class='log-form'>
            <fieldset class='inputs radios'>
                <label class='label' for='kind'>분류</label>
                <input type='radio' name='kind' value=1 class='radio-input'>수입
                <input type='radio' name='kind' value=0 class='radio-input'>지출
            </fieldset>
            <fieldset class='inputs'>
                <label class='label'>날짜</label>
                <input type='text' name='logDate' class='txt-input'>
                <label class='label' for='category'>카테고리</label>
                <select id='ctg-select' name='category' class='select'>
                    <option selected disabled>선택하세요</option>
                </select>
                <label class='label' for='payment'>결제수단</label>
                <select id='pay-select' name='payment' class='select'>
                    <option selected disabled>선택하세요</option>
                </select>
            </fieldset>
            <fieldset class='inputs'>
                <label class='label' for='price'>금액</label>
                <input type='text' name='price' class='txt-input'>
                <label class='label' for='contents'>내용</label>
                <input type='text' name='contents' class='txt-input contents'>
            </fieldset>
            <button id='log-submit' class='btn'>확인</button>
        </form>
    </div>
  `,
};
