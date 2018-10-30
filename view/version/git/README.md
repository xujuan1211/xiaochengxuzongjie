# Git 版本管理

### 谁赠予我们的
![git之父](./img/1.jpg)

很多人都知道，Linus在1991年创建了开源的Linux，从此，Linux系统不断发展，已经成为最大的服务器系统软件了。

    Linus虽然创建了Linux，但Linux的壮大是靠全世界热心的志愿者参与的，这么多人在世界各地为Linux编写代码，那Linux的代码是如何管理的呢？
    在2002年以前，世界各地的志愿者把源代码文件通过diff的方式发给Linus，然后由Linus本人通过手工方式合并代码！

    你也许会想，为什么Linus不把Linux代码放到版本控制系统里呢？不是有CVS、SVN这些免费的版本控制系统吗？因为Linus坚定地反对CVS和SVN，这些集中式的版本控制系统不但速度慢，而且必须联网才能使用。有一些商用的版本控制系统，虽然比CVS、SVN好用，但那是付费的，和Linux的开源精神不符。

    不过，到了2002年，Linux系统已经发展了十年了，代码库之大让Linus很难继续通过手工方式管理了，社区的弟兄们也对这种方式表达了强烈不满，于是Linus选择了一个商业的版本控制系统BitKeeper，BitKeeper的东家BitMover公司出于人道主义精神，授权Linux社区免费使用这个版本控制系统。

    安定团结的大好局面在2005年就被打破了，原因是Linux社区牛人聚集，不免沾染了一些梁山好汉的江湖习气。开发Samba的Andrew试图破解BitKeeper的协议（这么干的其实也不只他一个），被BitMover公司发现了（监控工作做得不错！），于是BitMover公司怒了，要收回Linux社区的免费使用权。

    Linus可以向BitMover公司道个歉，保证以后严格管教弟兄们，嗯，这是不可能的。实际情况是这样的：

    Linus花了两周时间自己用C写了一个分布式版本控制系统，这就是Git！一个月之内，Linux系统的源码已经由Git管理了！牛是怎么定义的呢？大家可以体会一下。

    Git迅速成为最流行的分布式版本控制系统，尤其是2008年，GitHub网站上线了，它为开源项目免费提供Git存储，无数开源项目开始迁移至GitHub，包括jQuery，PHP，Ruby等等。

**如果不是当年BitMover公司威胁Linux社区，可能现在我们就没有免费而超级好用的Git了**
### 常用命令

>查看配置,创建关联
```
    git init  初始化 git版本库
    git config -l 查看 git 配置
    git remote add origin git@github.com:michaelliao/learngit.git//关联远程仓
	git clone
```
>更换git 凭证
```
	git credential -manager uninstall
	git credential -manager install
```
>依据远程稳定的master创建一个分支，跟本地没有关系，无冲突！
```
	git checkout -b  xxxx分支名    依据本地现有的分支，创建一个新的分支，跟远程没有任何关系  有可能冲突！
	git checkout -b  xxxx分支名 origin/master 依据远程稳定的master创建一个分支，跟本地没有关系，无冲突！
```
>拉取更新
```
	git fetch
	git merge xxxx本地 
	git merge origin/远程仓名称
	git pull origin xxx 等同于上面两个
```
>修改上传
```
	git add xxx 
	git add .
	git commit -m “”
	git commit —amend 合并最近的commit
	git checkout — xxxx 撤销文件修改

    git push origin xxxx 
	git push origin xxxx -f 强制上传
```	
>查看状态
```
	git status
	git diff
	git log
	git reflog
```
>版本回退
```
    git log
	git reflog
	git reset --hard 3628164

	git revert 是生成一个新的提交来撤销某次提交，此次提交之前的commit都会被保留
	git reset 是回到某次提交，提交及之前的commit都会被保留，但是此次之后的修改都会被退回到暂存区
```

>防止过多的commit 出现
```
	git commit —amend -m”可选的是否改变你上次的提交信息！”
	git push origin xxxxxx -f
```
>分支管理
```
	git checkout xxx
	git checkout -b xxxx
	git branch  查看
	git branch  xxx 创建
	git branch -a
	git branch -d xxx
```	
>让分支提交更好看
```
git pull —rebase origin master
git rebase -i HEAD^^（个数）
git rebase —continue   //继续rebase
git rebase —skip           //跳过本次
git rebase —abort 	       //取消rebase 
```
[git rebase详细解读1](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0015266568413773c73cdc8b4ab4f9aa9be10ef3078be3f000)

[git rebase详细解读2](http://gitbook.liuhui998.com/4_2.html)



### 参考链接
[廖雪峰git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000);
### ppt讲解
![git使用新姿势](../../../static/git-use-method.pdf)
