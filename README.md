# seedit-oncetip [![spm version](https://moekit.timo.today/badge/seedit-oncetip)](https://moekit.timo.today/package/seedit-oncetip)

---

只显示一次的广告或者提示

## 配置

+ `storeId` 尽可能简短，用于cookie保存的key, 注意不要使用正在使用或者已经使用过的key。`最好为1~3个字母`。
+ `scope` cookie保存的子域名，如`bbs`,`riji`,使用`all`时会保存到全域。`能保存到单个域就不要保存到全域`。
+ `when` 函数，非必须，用于添加额外条件，判断什么时候显示广告
+ `onShow` 显示逻辑，当cookie没有设置过，并且满足上面的`when`条件时调用

## API

+ `hasShown` 广告是否已经使用过
+ `setHasShown(cb)` 关闭广告，cb为回调，cb不必需
+ `clear` 清除该广告cookie
+ `shouldBeShown` 广告是否应该显示

## Usage

一个只有fid为24的版块才显示的广告，cookie key 为`bk`，cookie保存在`bbs`，点击`.book-ooxx-close`时调用`setHasShown`来关闭广告。

```js
var Oncetip = require('seedit-oncetip');
var ooxxer = new Oncetip({
        storeId: 'bk',
        scope: 'bbs',
        when: function(){
			return window.fid && window.fid === 24;
        },
        onShow: function() {
                jQuery('#book_ooxx').fadeIn();
                jQuery('.book-ooxx-close').click(function() {
                    ooxxer.setHasShown(function() {
                        jQuery('#book_ooxx').fadeOut();
                    });
                });
        }
    });
```
