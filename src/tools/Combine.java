package tools;

/**
 * 制作元组，二元可以使用Map，这里直接从三元开始
 */
public class Combine {

    public <T> T getFirst() {
        return null;
    }

    public <T> T getSecond() {
        return null;
    }

    public <T> T getThird() {
        return null;
    }

    public <T> T getFourth() {
        return null;
    }

    public <T> void setFirst(T t) {

    }

    public <T> void setSecond(T t) {

    }

    public <T> void setThird(T t) {

    }

    public <T> void setFourth(T t) {

    }

    public static <A, B, C> Combine createThreeCombine(A a, B b, C c) {
        return new CombineThree<>(a, b, c);
    }

    public static <A, B, C, D> Combine createFourCombine(A a, B b, C c, D d) {
        return new CombineFour<>(a, b, c, d);
    }

    public static class CombineThree<A, B, C> extends Combine {
        private A a;
        private B b;
        private C c;

        public CombineThree() {

        }

        public CombineThree(A a, B b, C c) {
            this.a = a;
            this.b = b;
            this.c = c;
        }

        @Override
        public A getFirst() {
            return a;
        }

        @Override
        public B getSecond() {
            return b;
        }

        @Override
        public C getThird() {
            return c;
        }

        @Override
        public <T> void setFirst(T t) {
            a = (A) t;
        }

        @Override
        public <T> void setSecond(T t) {
            b = (B) t;
        }

        @Override
        public <T> void setThird(T t) {
            c = (C) t;
        }
    }

    public static class CombineFour<A, B, C, D> extends CombineThree<A, B, C> {
        private D d;

        public CombineFour() {

        }

        public CombineFour(A a, B b, C c, D d) {
            super(a, b, c);
            this.d = d;
        }

        @Override
        public D getFourth() {
            return d;
        }

        @Override
        public <T> void setFourth(T t) {
            d = (D) t;
        }
    }
}

