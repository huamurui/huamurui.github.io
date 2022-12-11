---
title: "大数据"
icon: creative
date: 2022-12-07
category:
  - 记录
  - 编程
---

记一下配置,也方便复制粘贴...Ubuntu22上装hadoop,hbase
然而还没装好...
这玩意有什么一键配置的操作吗，就像docker那种...艹，我应该先去找这玩意的。

Ubuntu 修改时区
timedatectl set-timezone Asia/Shanghai

### 安装jdk

apt-get update
apt-get install openjdk-11-jdk

### 创建hadoop用户

adduser hadoop
密码同为
hadoop
su hadoop

#### 赋权

ssh-keygen -t rsa  
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
chmod 640 ~/.ssh/authorized_keys  
ssh localhost

cd /home/hadoop

### 下载

#### 下载hadoop

wget <https://dlcdn.apache.org/hadoop/common/hadoop-3.3.4/hadoop-3.3.4.tar.gz>
tar xzf hadoop-3.3.4.tar.gz
mv hadoop-3.3.4 hadoop

#### 下载hbase

wget  <https://dlcdn.apache.org/hbase/2.5.2/hbase-2.5.2-bin.tar.gz>
tar xzf hbase-2.5.2-bin.tar.gz
mv hbase-2.5.2 hbase

### 环境变量

vim  ~/.bashrc
source ~/.bashrc

export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export HADOOP_HOME=/home/hadoop/hadoop
export HADOOP_INSTALL=$HADOOP_HOME
export HADOOP_MAPRED_HOME=$HADOOP_HOME
export HADOOP_COMMON_HOME=$HADOOP_HOME
export HADOOP_HDFS_HOME=$HADOOP_HOME
export HADOOP_YARN_HOME=$HADOOP_HOME
export HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
export HADOOP_OPTS="-Djava.library.path=$HADOOP_HOME/lib/native"
export HBASE_HOME=/home/hadoop/hbase
export PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin:$HBASE_HOME/bin

vim $HADOOP_HOME/etc/hadoop/hadoop-env.sh
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64

vim  /home/hadoop/hbase/conf/hbase-env.sh
export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
export HBASE_MANAGES_ZK=true

### 配置

#### 配置hadoop

vim $HADOOP_HOME/etc/hadoop/core-site.xml

```xml
<configuration>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://146.190.44.79:9000</value>
    </property>
</configuration>
```

vim $HADOOP_HOME/etc/hadoop/hdfs-site.xml

```xml
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>dfs.name.dir</name>
        <value>file:///home/hadoop/hadoopdata/hdfs/namenode</value>
    </property>
    <property>
        <name>dfs.data.dir</name>
        <value>file:///home/hadoop/hadoopdata/hdfs/datanode</value>
    </property>
</configuration>
```

vim $HADOOP_HOME/etc/hadoop/mapred-site.xml

```xml
<configuration>
    <property>
        <name>mapreduce.framework.name</name>
        <value>yarn</value>
    </property>
</configuration>

vim $HADOOP_HOME/etc/hadoop/yarn-site.xml
<configuration>
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>
</configuration>

```

#### 配置hbase

vim  /home/hadoop/hbase/conf/hbase-site.xml

```xml
<configuration>

  <property>
    <name>hbase.rootdir</name>
    <value>hdfs://146.190.44.79:9000/hbase</value>
  </property>
  <property>
    <name>hbase.master</name>
    <value>146.190.44.79:16000</value>
  </property>
  <property>
    <name>hbase.zookeeper.property.dataDir</name>
    <value>/tmp/zookeeper</value>
  </property>
  <property>
    <name>hbase.cluster.distributed</name>
    <value>true</value>
  </property>
</configuration>
```

### 启动

hdfs namenode -format  
start-all.sh

start-hbase.sh
rm /home/hadoop/hbase/lib/client-facing-thirdparty/log4j-slf4j-impl-2.17.2.jar

### 端口

146.190.44.79:8088
146.190.44.79:9870
146.190.44.79:16010

### hbase建表

hbase-daemon.sh start master ## 启动Hbase
hbase shell
create 'email_user','user'
create 'user_id','id'
create 'gid_disk','gid' create 'user_file','file'
create 'file','file'
create 'follow','name'
create 'followed','userid'
create 'share','content'
create 'shareed','shareid'

//hbase建表...这里的时区还是有问题。艹哦
