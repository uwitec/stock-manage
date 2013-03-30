/* Chinese initialisation for the jQuery UI date picker plugin. */ /* Written by Cloudream (cloudream@gmail.com). */ 
jQuery(function($){ 
	$.datepicker.regional['zh-CN'] = {
		clearText: '���', 
		clearStatus: '�����ѡ����', 
		closeText: '�ر�', 
		closeStatus: '���ı䵱ǰѡ��', 
			prevText: '&lt;����', 
			prevStatus: '��ʾ����', 
			nextText: '����&gt;', 
			nextStatus: '��ʾ����', 
			currentText: '����', 
			currentStatus: '��ʾ����', 
			monthNames: ['һ��','����','����','����','����','����', '����','����','����','ʮ��','ʮһ��','ʮ����'], 
			monthNamesShort: ['һ','��','��','��','��','��', '��','��','��','ʮ','ʮһ','ʮ��'], 
			monthStatus: 'ѡ���·�', 
			yearStatus: 'ѡ�����', 
			weekHeader: '��', 
			weekStatus: '�����ܴ�', 
			dayNames: ['������','����һ','���ڶ�','������','������','������','������'], 
			dayNamesShort: ['����','��һ','�ܶ�','����','����','����','����'], 
			dayNamesMin: ['��','һ','��','��','��','��','��'], 
			dayStatus: '���� DD Ϊһ����ʼ', dateStatus: 'ѡ�� m�� d��, DD', 
			dateFormat: 'yy-mm-dd', 
			firstDay: 1,  
			initStatus: '��ѡ������', 
			isRTL: false}; 
		$.datepicker.setDefaults($.datepicker.regional['zh-CN']); }); 