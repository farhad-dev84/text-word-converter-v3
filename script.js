// گرفتن المنت های html
const inputText = document.getElementById("inputText") ;
const btnUpper = document.getElementById("btnUpper") ;
const btnLower = document.getElementById("btnLower") ;
const btnSentence = document.getElementById("btnSentence") ;
const btnTitle = document.getElementById("btnTitle") ;
const btnTrim = document.getElementById("btnTrim") ;
const btnCopy = document.getElementById("btnCopy") ;
const btnSave = document.getElementById("btnSave") ;
const btnToggleMode = document.getElementById("btnToggleMode") ;
const wordCount = document.getElementById("wordCount") ;
const charCount = document.getElementById("charCount") ;
const previewText = document.getElementById("previewText") ;

// تابع به روزرسانی امار متن و پیش نمایش
function updateStatsAndPreview() {
  const text = inputText.value ;
  // شمارش کلمات کلماتی که حداقل یک کاراکتر غیر فاصله اضافی داشته باشند
  const words = text.trim().split(/\s+/).filter(word => word.length > 0) ;
  wordCount.textContent = text.length ;
  charCount.textContent = words.length ;
  previewText.textContent = text ;
}

// تابع تبدیل به حروف بزرگ
btnUpper.addEventListener("click" , () => {
  inputText.value = inputText.value.toUpperCase() ;
  updateStatsAndPreview() ;
}) ;

// تابع تبدیل به حروف کوچک
btnLower.addEventListener("click" , () => {
  inputText.value = inputText.value.toLowerCase() ;
  updateStatsAndPreview() ;
}) ;

// تابع تبدیل به حالت جمله ای اول هر جمله بزرگ بقیه کوچک
btnSentence.addEventListener("click" , () => {
  let text = inputText.value.toLowerCase() ;
  // تقسیم متن به جملات بر اساس نقطه علامت تعجب و علامت سوال 
  text = text.replace(/(^\s*\w|[.!?]\s*\w)/g , c.toUpperCase()) ;
  inputText.value = text ;
  updateStatsAndPreview() ;
}) ;

// تابع تبدیل به حالت تیتر هرکلمه با حرف بزرگ
btnTitle.addEventListener("click" , () => {
  let text = inputText.value.toLowerCase() ;
  text = text.split(' ').map(word => word.charAt(0).toUpperCase() +
  word.slice(1)).join(' ') ;
  inputText.value = text ;
  updateStatsAndPreview() ;
}) ;

// حذف فاصله های اضافی
btnTrim.addEventListener("click" , () => {
  let text = inputText.value ;
  text = text.replace(/\s+/g , ' ').trim() ;
  inputText.value = text ;
  updateStatsAndPreview() ;
}) ;

// کپی متن به کلیپ بورد
btnCopy.addEventListener("click" , () => {
  navigator.clipboard.writeText(inputText.value)
  .then(() => alert("متن کپی شد !"))
  .catch(() => alert("کپی متن ناموفق بود !")) ;
}) ;

// ذخیره متن به فایل txt 
btnSave.addEventListener("click" , () => {
  let text = inputText.value ;
  const blob = new Blob([text] , {type : "text/plain"}) ;
  const url = URL.createObjectURL(blob) ;
  const a = document.createElement("a") ;
  a.href = url ;
  a.download = "converted-text.txt" ;
  document.body.appendChild(a) ;
  a.click() ;
  document.body.removeChild(a) ;
  URL.revokeObjectURL(url) ;
}) ;

// حالت تاریک / روشن
btnToggleMode.addEventListener("click" , () => {
  document.body.classList.toggle("dark-mode") ;
}) ;

// به روزرسانی امار و پیش نمایش هنگام تایپ
inputText.addEventListener("input" , updateStatsAndPreview) ;

// مقدار اولیه
updateStatsAndPreview() ;