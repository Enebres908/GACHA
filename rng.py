import random 

def simulate_pulls(pulls, base_rate=0.8, soft_pity_start=70, hard_pity=90, verbose=True):
    count = 0
    
    featured_ssrs = 0
    standard_ssrs = 0
    wins_5050 = 0
    loses_5050 = 0
    guaranteed = False  # Track if next SSR is guaranteed featured

    if verbose:
        print(f"--- SIMULATING {pulls} PULLS (Base Rate: {base_rate}%, Soft Pity: {soft_pity_start}, Hard Pity: {hard_pity}) ---")

    for i in range(1, pulls + 1):
        count += 1
        
        # Calculate dynamic rate based on pity
        if count >= hard_pity:
            current_rate = 100.0  # 100% Hard Pity guarantee
        elif count >= soft_pity_start:
            # Soft pity: rate increases steadily (+6.0% per pull after soft pity start)
            current_rate = base_rate + (count - soft_pity_start + 1) * 6.0
        else:
            current_rate = base_rate  # Base rate (< 70 pulls)

        # Check pull success
        if random.random() < current_rate / 100:
            # SSR Hit! Determine 50/50 outcome
            if guaranteed:
                ssr_type = "Featured (Guaranteed)"
                featured_ssrs += 1
                guaranteed = False
            else:
                if random.random() < 0.5:
                    ssr_type = "Featured (Won 50/50)"
                    featured_ssrs += 1
                    wins_5050 += 1
                else:
                    ssr_type = "Standard (Lost 50/50 -> Next Guaranteed)"
                    standard_ssrs += 1
                    loses_5050 += 1
                    guaranteed = True
            
            pity_note = "SOFT PITY" if count >= soft_pity_start and count < hard_pity else ("HARD PITY" if count >= hard_pity else "EARLY / LUCKY")
            
            if verbose:
                print(f"[Pull #{i:4d}] ⭐ SSR HIT! (Pity count: {count:2d} | {pity_note}) -> {ssr_type}")

            # Reset pity counter on hit
            count = 0

    total_ssrs = featured_ssrs + standard_ssrs
    overall_pct = (total_ssrs / pulls) * 100 if pulls > 0 else 0
    total_5050_flips = wins_5050 + loses_5050
    win_rate_5050 = (wins_5050 / total_5050_flips * 100) if total_5050_flips > 0 else 0

    if verbose:
        print("\n" + "=" * 60)
        print("SUMMARY REPORT")
        print("=" * 60)
        print(f"Total Pulls          : {pulls}")
        print(f"Total SSRs Obtained  : {total_ssrs} ({overall_pct:.2f}% overall drop rate)")
        print(f"  - Featured SSRs    : {featured_ssrs}")
        print(f"  - Standard SSRs    : {standard_ssrs}")
        print(f"50/50 Record         : {wins_5050} Wins / {loses_5050} Losses ({win_rate_5050:.1f}% win rate)")
        print("=" * 60)

    return total_ssrs, featured_ssrs, standard_ssrs

if __name__ == "__main__":
    pulls = 500
    base_rate = 0.8
    simulate_pulls(pulls, base_rate, soft_pity_start=70, hard_pity=90, verbose=True)
