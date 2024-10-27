let SELECT_MENU = {
   menuData : null,
   selectMenu : '',
   fn_select_menu : function() {

      const _this = this;

      const url = '/en_selectMenu/menu.json?date=' + new Date();
      const xhr = new XMLHttpRequest();

      xhr.open('GET', url, true);
      xhr.onload = function() {
         if (xhr.status >= 200 && xhr.status < 400) {
            const response = JSON.parse(xhr.responseText);

            _this.menuData = response;

            const menu = _this.extractRandomData(_this.menuData);
            document.getElementById('menu').innerHTML = menu.menuName;
            _this.selectMenu = menu.menuName;

            if(menu.by !== '') {
               document.getElementById('by').innerText = 'by ' + menu.by;
            } else document.getElementById('by').innerText = '';

            document.getElementById('share_btn').style.display = 'flex';

         } else {
            console.error('Error:', xhr.status);
         }
      };

      xhr.onerror = function() {
         console.error('Request failed');
      };

      xhr.send();
   },
   // 데이터 로드 및 무작위 추출 함수
   extractRandomData : function (data) {
      let randomIndex = Math.floor(Math.random() * data.length);
      return data[randomIndex];
   },
   //공유하기
   fn_menu_share : async function () {
      const _this = this;

      if (navigator.share) {
         try {
            await navigator.share({
               title: 'What’s on the menu today?',
               text: `\nWanna have [${_this.selectMenu}] together?`,
               url: '\nhttps://play.google.com/store/apps/details?id=com.selectmenu.devmango1128&pcampaignid=web_share'
            });
            console.log('공유 성공!');
         } catch (error) {
            console.error('공유 실패:', error);
         }
      } else if (window.Android) {
         await window.Android.share('What’s on the menu today?', `\nWanna have [${_this.selectMenu}] together?`, '\nhttps://play.google.com/store/apps/details?id=com.selectmenu.devmango1128&pcampaignid=web_share');
      } else {
         alert('This browser does not support the recommendation feature.');
      }
   }
}