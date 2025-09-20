from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile')
def profile():
    user_data = {
        'username': 'O7c2',
        'avatar_url': 'https://avatars.githubusercontent.com/u/192097429?u=cdad0c96b8462ad5a1f0e546992c75b753b6c389&v=4',
        'bio': '欢迎探索我的项目！',
        'projects': [
            {'name': '使用 SVD 实现简单图像处理（数学应用）', 'url': 'https://github.com/O7c2/svd-image'},
            {'name': '访问我的 GitHub 主页', 'url': 'https://github.com/O7c2'}
        ]
    }
    return render_template('profile.html', user=user_data)

if __name__ == '__main__':
    app.run(debug=True)
