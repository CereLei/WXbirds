//API的测试
export class ApiExamples{
    getUserInfo(){
        wx.getUserInfo({
            success:function(res){

                console.log(res);
            }
        })
    }
}