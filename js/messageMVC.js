!function () {
    var view = document.querySelector('.messageList')

    var model = {
        //初始化leanCloud
        initAV: function () {
            var APP_ID = 'tjCUlB9CXjFJ8z3WwEyp3gNR-gzGzoHsz'
            var APP_KEY = 'gg8Sl7uDml3GE7MABRKG2hri'

            AV.init({appId: APP_ID, appKey: APP_KEY});
        },

        //获取数据
        fetchData: function () {
            var query = new AV.Query('Messages');
            return query.find()        //find自带Promise对象，要记得return Promise对象，不然外部无法调用
        },

        //保存数据
        saveData: function (name, content) {
            var messageObject = AV.Object.extend('Messages');
            var message = new messageObject();
            return message.save({     //save自带Promise对象，要记得return Promise对象，不然外部无法调用
                name: name,
                content: content
            })
        }
    }


    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('form')
            this.model.initAV()
            this.loadMessages()
            this.bindEvents()
        },

        loadMessages: function () {
            this.model.fetchData().then((messages) => {
                let arr = messages.map((item) => item.attributes)
                arr.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = `${item.name}:${item.content}`
                    this.messageList.appendChild(li)
                })
            }, function (error) {
                // 异常处理
            });
        },
        bindEvents: function () {
            //bindEvents只绑定事件，其他事情不做
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()

            })
        },
        saveMessage: function () {
            let myForm = this.form
            let name = myForm.querySelector('input[name=name]').value
            let content = myForm.querySelector('input[name=content]').value
            // console.log(content)
            this.model.saveData(name, content).then(function (object) {

                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
            })
        }
    }

    //在controller中传入view和model对它们进行初始化
    controller.init(view, model)

}.call()

