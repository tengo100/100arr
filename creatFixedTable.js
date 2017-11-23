//左右可固定列的表格插件
//colLeft 左侧固定列数配置项
//colRight 右侧固定列数配置项
//静态表格添加固定列
(function($){
    $.fn.creatFixedTable=function(options){
        //默认参数设置
        var defaults={
            //固定前几列
            colLeft:0,
            colRight:0,
            fixedWrapperClass:'tb-wp',
            fixedLeftTableClass:'left-fix-table',
            fixedRightTableClass:'right-fix-table',
            boxLeftShadow:'-6px 0 6px -4px rgba(0,0,0,.2)',
            boxRightShadow:'6px 0 6px -4px rgba(0,0,0,.2)'
        };
        var o=$.extend(defaults,options);
        return this.each(function(){
            var me=$(this);
            var originWidth=me.parent().width();
            var fixedData=creatFixedCol();
            var fixedLeftTable=fixedData.fixedLeftTable;
            var fixedRightTable=fixedData.fixedRightTable;
            var fixedRightTableMargin=fixedData.fixedRightTableMargin;
            me.wrap('<div class='+o.fixedWrapperClass+'>');
            //外层包裹层样式
            me.parent().css({
                'width':originWidth,
                'margin':'auto',
                'overflow':'auto'
            });
            if(o.colLeft){
                $('<table class='+o.fixedLeftTableClass+' border="0" cellpadding="0" cellspacing="0">')
                    .append(fixedLeftTable)
                    .appendTo(me.parent())
                    .css({
                        width:0,
                        tableLayout:'fixed',
                        position:'absolute',
                        top:0,
                        background:'#fff',
                        wordBreak:'break-all'
                    });
            }
            if(o.colRight){
                $('<table class='+o.fixedRightTableClass+' border="0" cellpadding="0" cellspacing="0">')
                    .append(fixedRightTable)
                    .appendTo(me.parent())
                    .css({
                        width:0,
                        tableLayout:'fixed',
                        position:'absolute',
                        top:0,
                        marginLeft:me.parent().width()-fixedRightTableMargin,
                        background:'#fff',
                        wordBreak:'break-all',
                        boxShadow:o.boxLeftShadow
                    });
            }
            me.parent().scroll(function(){
                if($(this).scrollLeft()===0){
                    $(this).find('.'+o.fixedLeftTableClass).css('boxShadow','none');
                }
                else{
                    $(this).find('.'+o.fixedLeftTableClass).css('boxShadow',o.boxRightShadow);
                    $(this).find('.'+o.fixedRightTableClass).css('boxShadow',o.boxLeftShadow);
                }
                if(($(this)[0].scrollLeft+me.parent().width())>=$(this)[0].scrollWidth){
                    $(this).find('.'+o.fixedRightTableClass).css('boxShadow','none');
                }
            });
            function creatFixedCol(){
                var colLeftStr='';
                var colRightStr='';
                var fixedRightTableMargin=0;
                me.find('tr').each(function(i,el){
                    colLeftStr+='<tr>';
                    colRightStr+='<tr>';
                    var length=$(this).children().length;
                    $(this).children().each(function(j,val){
                        if(j<o.colLeft){
                            colLeftStr+=$(this).prop('outerHTML');
                        }
                        if(j>=length-o.colRight){
                            colRightStr+=$(this).prop('outerHTML');
                            if(i===0){
                                fixedRightTableMargin+=$(this).width();
                            }
                        }
                    });
                    colLeftStr+='</tr>';
                    colRightStr+='</tr>';
                });
                return {
                    fixedLeftTable:colLeftStr,
                    fixedRightTable:colRightStr,
                    fixedRightTableMargin:fixedRightTableMargin
                }
            }
        });
    };
})(jQuery);
//生成固定左1列及右1列的表格
//$('#originalTable').creatFixedTable({colLeft:1,colRight:1});