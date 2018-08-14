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
            return query.find() //Promise对象
        },

        //保存数据
        saveData: function (name, content) {
            var messageObject = AV.Object.extend('Messages');
            var message = new messageObject();
            message.save({
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
                console.log(messages)
                console.log(messages[0].attributes)
                console.log(messages[1].attributes)
                let arr = messages.map((item) => item.attributes)
                console.log(arr)
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
            let myform = this.form
            let name = myform.querySelector('input[name=name]').value
            let content = myform.querySelector('input[name=content]').value
            // console.log(content)
            this.model.saveData(name, content).then(function (object) {
                // console.log(object)
                // alert('LeanCloud Rocks!');
                let li = document.createElement('li')
                li.innerText = `${object.attributes.name}:${object.attributes.content}`
                let messageList = document.querySelector('#messageList')
                messageList.appendChild(li)
            })
        }
    }

    //在controller中传入view和model对它们进行初始化
    controller.init(view, model)
    // model().call()

}.call()

