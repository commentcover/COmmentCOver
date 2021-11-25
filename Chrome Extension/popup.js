function setting(){
    const ext_runable = document.getElementById('toggle_btn').checked;
    const setting = {
        check_or_not: ext_runable
    };
    console.log(setting);
    chrome.storage.sync.set(setting, () => {
        console.log('Stored',setting);
    })
    chrome.storage.sync.get('check_or_not', (result) => {
        document.getElementById('toggle_btn').checked = result.check_or_not;
        console.log('setting finished');
    })
}

window.onload= () => {
    // 기존에 저장된 on/off 상태로 버튼 setting
    chrome.storage.sync.get('check_or_not', (result) => {
    document.getElementById('toggle_btn').checked = result.check_or_not;
    console.log('#first check set#', document.getElementById('toggle_btn').checked);
    })
    // 버튼 클릭될 때마다 setting
    document.getElementById('toggle_btn').addEventListener('click', (e) => {
    console.log('current:', e.currentTarget.checked);
    setting();
    })
}