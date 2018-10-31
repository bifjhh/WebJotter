var fs = require('fs');

fs.mkdir('./01-tese', function (err) {
	if (err) {
		console.log('创建目录出错,详情如下:', err);
		return;
	}
	console.log('创建成功');
	fs.mkdir('./01-tese/01-01', function (err) {
		if (err) {
			console.log('创建目录出错,详情如下:', err);
			return
		}
		console.log('二级目01录创建成功');
	});
	fs.mkdir('./01-tese/01-02', function (err) {
		if (err) {
			console.log('创建目录出错,详情如下:', err);
			return
		}
			console.log('二级目录02创建成功');
	});
	fs.mkdir('./01-tese/01-03', function (err) {
		if (err) {
			console.log('创建目录出错,详情如下:', err);
			return
		}
		console.log('二级目录03创建成功');
	});
	fs.mkdir('./01-tese/01-04', function (err) {
		if (err) {
			console.log('创建目录出错,详情如下:', err);
			return
		}
		console.log('二级目录04创建成功');
	});
})