[原文链接](https://mp.weixin.qq.com/s?__biz=MzUxNjM5MTEyMg==&mid=2247483993&idx=1&sn=ad66c091b43e3441fc9ac292453971cf&chksm=f9a96be4cedee2f212f8e50819e3273e77a904cc2b228143b63437994fccae26dc393d288564#rd)

[我的GitHub博客地址](https://github.com/WeaponZhi/AI_BLOG)

一
-

上篇文章我们进行了黄金行情数据爬取，并对黄金数据进行了一波花式分析，这篇文章我们将用我们之前的文章所用过的策略进行黄金价格的分析，并通过分析，优化我们的代码，提升预测的正确性。

我们输出一下这3650天的涨跌情况的柱状分布图

    rate_of_return.plot(kind='hist',bins=150,alpha=0.3,color='g',normed=1)
    rate_of_return.plot(kind='kde',xlim=[-0.1,0.1],style='r',grid=True,figsize=(15,10))
    plt.show()
    复制代码

仅用三行代码，我们就输出了这样一个优美的柱状分布图，这里面红色的曲线叫kde图，中文名字叫核密度估计图，是在概率论中用来估计未知的密度函数。

我们可以看到，涨跌幅的分布是一个比较标准的正态分布，中间高两边小，而且对于XAUUSD来说，因为有高达两百倍这样的杠杆比率的存在，我们看来很小的一些涨跌幅波动，对于炒外汇的人来说，那一上一下就是好几个亿啊！

二
-

OK，现在我们按照机器学习股票价格预测初级实战这篇文章的方法对黄金价格进行预测，主要思路就是，通过对预测当天前两天的涨跌情况作为特征，而标签为预测当天的涨跌情况。

这样跑下来，我们的预测正确率为53%，实际上这个结果我认为还是有一定道理的，如果行情连续两天都在涨，那么第三天最后是涨的情况可能确实要多一些。

这边因为代码重复，我就直接截图了

因为我有自己玩过外汇，所以大概会看一些简单的趋势，而这些趋势判断的时间段经常是以月为单位的，所以我们可以动态的改变一下窗口期，一个月的工作日有21，22天这样，那么我们就从看看预测概率在window为1-22情况下的情况吧。

    # 窗口期对预测数量的影响
    win_ratio = []
    window_list = [x for x in range(22) if x != 0]
    i = 1
    for window in window_list:
       
       X = deque()
       y = deque()
       clf = tree.DecisionTreeClassifier()
       prediction = 0
       test_num = 0
       win_num = 0
    
    
       current_index = window
       
       for current_index in range(current_index, len(up_and_down)-1, 1):
           fact = up_and_down[current_index+1]
           
           X.append(list(up_and_down[(current_index-window): current_index]))
           y.append(up_and_down[current_index])
           if len(y) > 100:
               test_num += 1
               clf.fit(X, y)
       
               prediction = clf.predict([list(up_and_down[(current_index-window+1): current_index+1])])
           
               if prediction[0] == fact:
                   win_num += 1
       ratio = win_num/test_num
       print("已完成预测",i,'次')
       i += 1
       win_ratio.append(ratio)
    
    fig = plt.figure(figsize=(12,10))
    plt.plot(window_list,win_ratio,'ro--')
    plt.show()
    复制代码

结果非常有趣，我们发现，窗口期从8开始，预测的正确率呈现出一个比较明显的上扬趋势，甚至在window为17天的时候，正确率达到惊人的百分之57。

实际上我有在别的品种，比如股票的品种上跑过相同的代码，但大多数的正确率只有52-53之间。看，我们好似发现了黄金外汇中的一个比较有趣的影响特征了。

实际上我这样的写法过于粗暴，因为我们window的数量对于这个案例来说直接决定了我们的特征维度，window越大，你会发现我们整个的预测逻辑执行时间将会越长。这里会涉及到一个特征工程，我们可以可以把这样的特征转化为一个映射。这样，无论window是多少，最后都会转化为一个特征。

比如，如果window=4，然后其中一个样本的前四天的涨跌情况为，涨涨跌跌，通过映射，我们可以用一个矢量来表示:\[1,1,0,0\]。当然啦，特征工程是一个非常重要的事情，我们今天的重点并不在这。

我们来试试对于预测sample进行动态改变会对预测结果带来多少影响。

    # 样本数量对预测率的影响
    window = 2
    win_ratio = []
    samples_list = [x*5 for x in range(60) if x != 0]
    
    for samples in samples_list:
       
       X = deque()
       y = deque()
       clf = tree.DecisionTreeClassifier()
       prediction = 0
       test_num = 0
       win_num = 0
    
    
       current_index = 2
    
       for current_index in range(current_index, len(up_and_down)-1, 1):
           fact = up_and_down[current_index+1]
           
           X.append(list(up_and_down[(current_index-window): current_index]))
           y.append(up_and_down[current_index])
           if len(y) > samples:
               test_num += 1
               clf.fit(X, y)
       
               prediction = clf.predict([list(up_and_down[(current_index-window+1): current_index+1])])
           
               if prediction[0] == fact:
                   win_num += 1
       ratio = win_num/test_num        
       win_ratio.append(ratio)
    print("预测完毕")
    
    
    fig = plt.figure(figsize=(12,10))
    plt.plot(samples_list,win_ratio,'ro--')
    plt.show()
    复制代码

没错，看起来确实有些影响，但看看我们的y轴数值，实际上影响并不是很大，这里主要因为我的循环数量还是很低，最高的300对于3000多的完整数据来说，还是不太够的。

再有，我这套代码的训练泛化性并不高，我在sample训练之后，虽然划分了训练集和测试集，但每次预测完一个测试数据就会把这条数据在下次预测的时候添加到训练数据集里，所以结果差距不大，确实在情理之中。

这里涉及到一个拆分数据的问题，如果可以，尽量将数据拆分成三层 : 训练集、验证集和测试集。

三
-

文章差不多要结束了，我们的价格预测，实际上还差得远呢，最重要的是，我并不是一个专业的金融分析师，做这样的量化交易与预测分析，显然是需要金融专业的人和程序员配合才能擦出火花，我一直觉得金融是机器学习目前最适用的领域了，它的数据多，指标全，太适合做历史数据分析了，任重而道远，还有很多值得我去学习的。

这是最近两篇文章 ipy 和 py 源代码文件的 Github 链接，有需要的朋友请下载观看，建议使用 jupyter notebook 观看，体验更好一点

[源代码链接](https://github.com/WeaponZhi/AI_BLOG)

参考文章： [关于涨跌的思考](https://www.ricequant.com/community/topic/103)

* * *

**推荐阅读**

[量化交易与人工智能到底是咋回事](https://mp.weixin.qq.com/s?__biz=MzUxNjM5MTEyMg==&mid=2247483976&idx=1&sn=0fbf73d957e26862a4fd3d088490c717&chksm=f9a96bf5cedee2e37844ffa54bba54fff6d4eb1a90c90db05e1b4b3e572837063ced1f0ca8cc&scene=21#wechat_redirect)

[机器学习股票价格预测初级实战](https://mp.weixin.qq.com/s?__biz=MzUxNjM5MTEyMg==&mid=2247483983&idx=1&sn=25c7782d0800b1f937bb32e02af1677b&chksm=f9a96bf2cedee2e4ac2af01c2c58419bff2eaf550af158f4eaa6c18f6ef0c917a6cc4229ae52#rd)

[机器学习股票价格预测从爬虫到预测(数据爬取部分)](https://mp.weixin.qq.com/s?__biz=MzUxNjM5MTEyMg==&mid=2247483993&idx=1&sn=ad66c091b43e3441fc9ac292453971cf&chksm=f9a96be4cedee2f212f8e50819e3273e77a904cc2b228143b63437994fccae26dc393d288564&scene=21#wechat_redirect)

**关注公众号获取更多干货文章-AI极客研修站**
-------------------------