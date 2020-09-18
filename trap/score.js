function score(player) {
    env.score[player] ++
    trap('puck')
}
