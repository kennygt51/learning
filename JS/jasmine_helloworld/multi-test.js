describe('multi関数の実行', function() {
    it('1 * 1 は 1', function() {
        expect(multi(1, 1)).toBe(1);
    });

    it('2 * 2 は 4', function() {
        expect(multi(2, 2)).toBe(4);
    });

    it('3 * 3 は 9', function() {
        expect(multi(3, 3)).toBe(10); // わざと失敗
    });
});
