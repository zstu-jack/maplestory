/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
package server;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @author Ronan
 */
public class ThreadManager {
    private static final ThreadManager instance = new ThreadManager();

    public static ThreadManager getInstance() {
        return instance;
    }

    private ThreadPoolExecutor tpe;

    private ThreadManager() {
    }

    private static class RejectedExecutionHandlerImpl implements RejectedExecutionHandler {
        /**
         * 线程池如果满了，会新建一个线程处理被拒绝的任务
         *
         * @param r the runnable task requested to be executed
         * @param executor the executor attempting to execute this task
         */
        @Override
        public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
            Thread t = new Thread(r);
            t.start();
        }
    }

    public void newTask(Runnable r) {
        tpe.execute(r);
    }

    public void start() {
        RejectedExecutionHandler reh = new RejectedExecutionHandlerImpl();
        ThreadFactory tf = new ThreadFactory() {
            private final AtomicInteger threadNumber = new AtomicInteger(1);

            @Override
            public Thread newThread(Runnable r) {
                Thread t = new Thread(r);
                t.setName("ThreadManager-Worker-" + threadNumber.getAndIncrement());
                return t;
            }
        };
        int cores = Runtime.getRuntime().availableProcessors();
        // 这里原来核心线程是20，最大线程是1000，太离谱了
        tpe = new ThreadPoolExecutor(cores, 2 * cores, 60, TimeUnit.SECONDS, new ArrayBlockingQueue<>(50), tf, reh);
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void stop() {
        tpe.shutdown();
        try {
            tpe.awaitTermination(5, TimeUnit.MINUTES);
        } catch (InterruptedException ignore) {
        }
    }

}
