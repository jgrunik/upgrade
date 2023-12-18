# ♠ Upgrade

_A multiplayer browser-based edition of the Upgrade card game._

Upgrade is a competetive turn-based elimination game balancing strategy and luck. It draws inspiration from the combat of "Yu-Gi-Oh!" and the risks of "Skull".

[![image](https://github.com/jgrunik/upgrade/assets/14305136/bcb4baef-4e77-45f8-aaba-320532cd720b)](https://jgrunik.github.io/upgrade/)

_Upgrade was first conceived by Josh and his pals in his mum's garage way-back-when and more recently has been workshopped with his adult chums._

<br/>

# How to play?

## Objective

Eliminate all other players by being the last player remaining with tokens.

## Number of Players

A standard game can be played with 2 or more players and can easily be adjusted to accommodate any group size.

## Components

- A standard 52-card deck - _Jack, Queen, King, & Jokers removed_
- Tokens - _3 per player_

## Setup

1. Shuffle the deck
2. Provide each player with 3 tokens
3. Deal 3 cards, face-down, to each player
4. Each player simultaneously places the following cards in front of them:
   - 2 face-down defence cards
   - 1 face-up attack card - _(in front of defence cards)_

## Gameplay

Starting with the dealer, turns progress clockwise.

In a turn, the current player must:

1. Draw a card
2. **_Upgrade_**, **_Discard_**, or **_Attack_**.

Turns continue until only one player remains.

### **_Upgrade_**

1. Announce "Upgrade"
2. Either:

   - Discard an attack or defence card, and replace it with the drawn card
   - Optionally, when there is only one attack card; add the drawn card to the attack row

### **_Discard_**

1. Announce "Discard"
2. Discard the drawn card

### **_Attack_**

1. Announce which player is being attacked
2. The defending player reveals both defence cards
3. Compare the combined attack to the combined defence\
   _(Simply totalling the face values for each)_
   - If attack is higher; take a token from the defender
   - If attack is lower; discard a token from the game
   - If equal; it's is a draw, no tokens are affected
4. All cards involved in the attack are discarded:
   - The attacker's attack cards
   - The defender's defence cards
5. The drawn card is placed as an attack card
6. The defender draws 2 new cards to fill their defence

## Rules

### _Elimination_

When a players has no tokens, they are out of the game.  
They discard all their cards and forfeit all remaining turns.

### _Full attack and defence_

All attack cards must be used when attacking.  
All defence cards must be used when defending.

### _Discarding_

Discarded cards are placed face-up beside the deck.  
Discarded tokens are removed from the game.

## Strategy

**Target Selection:** When choosing who to attack, it might be strategic to target players with fewer tokens left, as eliminating other players is the key to winning.

**Upgrade Wisely:** Upgrading an attack card could lead to a more successful attack, but leaving defence weak could be dangerous!

**Risk Management:** If your attack is lower, you'll lose a token. So, ensure your attack has a high chance of success before you proceed.

**Defensive Play:** When tokens are running low, it might be wise to focus on upgrading defence cards to withstand attacks and stay in the game.

## Variations

### _Modifiers_

_Adjust any of these to suit your group's playstyle:_

- **Initial tokens**\
   _- effects game length_

- **Amount of card ranks** _(e.g. adding Jack, Queen, King)_\
  _- effects unpredictability (more random = less strategy)_

- **Disallowing discarding the drawn card to end a turn**\
  _- forces players to downgrade or attack_

  - **Disallowing downgrading attack**\
    _- makes the forced choice even more difficult_

- **Maximum number of cards in attack and defence rows**\
  _- effects overall complexity and game length_

- **Discard face-down**\
  _- effects card-counting strategies_

### _**"Rush"** Variant_

- A maximum of 1 attack card and 1 defence card.
- 2 cards are dealt to each player at the start of the game.
- 1 card is drawn to replace a defence.
- No discarding.

## Etiquette

### _Bowing on a draw_

When an attack is equal to defence; it is customary for both players to put their hands together, face each other, and bow; as a sign of respect.\
_Note: Doing otherwise may be considered poor sportsmanship!_

## Additional Resources

**Play online at: [jgrunik.github.io/upgrade](http://jgrunik.github.io/upgrade)**

_Other combat card games:_

- [Card Games: Combat Games [pagat]](https://www.pagat.com/combat/)
- [Cuttle [boardgamegeek]](https://boardgamegeek.com/boardgame/115370/cuttle)

<br/>

# Developer Stuff

To install dependencies:

```bash
bun install
```

To serve:

```bash
bun run serve
```

To build:

```bash
bun run build
```

This project was created using `bun init` in bun v1.0.12. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
