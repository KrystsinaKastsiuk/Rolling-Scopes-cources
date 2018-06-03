describe("TicTacToe", function() {
  var ticTacToe;

  beforeEach(function() {
    ticTacToe = new TicTacToe();
  });

  describe("Winning combination", function(){
    it("should change the symbol each turn", function() {
      ticTacToe.move(1);
      expect(ticTacToe.symbol()).to.equal('X');
    });

    it("should change the symbol correctly for a bunch of turns", function() {
      ticTacToe.move(1);
      expect(ticTacToe.symbol()).to.equal('X');
      ticTacToe.move(2);
      expect(ticTacToe.symbol()).to.equal('O');
      ticTacToe.move(3);
      expect(ticTacToe.symbol()).to.equal('X');
      ticTacToe.move(4);
      expect(ticTacToe.symbol()).to.equal('O');
    });

    it("should find a winner when all X", function() {
      ticTacToe.move(1);
      ticTacToe.move(4);
      ticTacToe.move(2);
      ticTacToe.move(7);
      ticTacToe.move(3);
      expect(ticTacToe.check()).to.equal('X wins');
    });

    it("should not find a winner when not all X", function() {
      expect(ticTacToe.check()).to.equal(undefined);
    });

    it("should find a winner for top diagonal", function() {
      ticTacToe.move(2);
      ticTacToe.move(3);
      ticTacToe.move(8);
      ticTacToe.move(5);
      ticTacToe.move(4);
      ticTacToe.move(7);
      expect(ticTacToe.check()).to.equal('O wins');
    });

    it("should find a winner for bottom diagonal", function() {
      ticTacToe.move(9);
      ticTacToe.move(4);
      ticTacToe.move(6);
      ticTacToe.move(3);
      ticTacToe.move(7);
      ticTacToe.move(8);
      ticTacToe.move(2);
      ticTacToe.move(1);
      ticTacToe.move(5);
      expect(ticTacToe.check()).to.equal('A draw');
    });

    it("should find a winner throught chaining", function() {
      ticTacToe.move(2).move(1).move(3).move(5).move(4).move(9);
      expect(ticTacToe.check()).to.equal('O wins');
    });
  });

  describe ("Check a position", function(){
    it("should return a message about incorrect position", function(){
      expect(ticTacToe.move(-3)).to.equal('Select position > 0 and < 10');
      expect(ticTacToe.move(12)).to.equal('Select position > 0 and < 10');
      expect(ticTacToe.move('JavaScript')).to.equal('Select position > 0 and < 10');
    });

    it("should return a message about occupied position", function(){
      expect(ticTacToe.move(1).move(3).move(5).move(3)).to.equal('Position is occupied');
    });

    it("should choose a position within 1..10", function(){
      expect(ticTacToe.move(-3)).to.equal('Select position > 0 and < 10');
      expect(ticTacToe.move(12)).to.equal('Select position > 0 and < 10');
      expect(ticTacToe.move('JavaScript')).to.equal('Select position > 0 and < 10');
    });
  });

  describe('DOM', function(){
    it("should construct a square 3 x 3", function() {
      var dom = document.createElement('div');
      dom.classList.add('wrapper');
      dom.innerHTML = '<table><tr><td class="cell active" id="1"></td><td class="cell active" id="2"></td><td class="cell active" id="3"></td></tr><tr><td class="cell active" id="4"></td><td class="cell active" id="5"></td><td class="cell active" id="6"></td></tr><tr><td class="cell active" id="7"></td><td class="cell active" id="8"></td><td class="cell active" id="9"></td></tr></table>';
      expect(ticTacToe.domCreate().innerHTML).to.equal(dom.innerHTML);
    });
  });

});