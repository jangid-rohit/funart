while read -r line || [ -n "$line" ]; do
#     if [[ "$line" == *"coderbyte heroku/router"* ]]; then
    if [[ $(echo $line | grep "coderbyte heroku/router" -c) -gt 0 ]]; then
        for word in $line; do
            if [[ "$word" == *"request_id="* ]]; then
                echo -ne "${word#*=} "
            fi

            if [[ "$word" == "fwd=\"MASKED\"" ]]; then
                echo -e "[M]"
            elif [[ "$word" == *"fwd="* ]]; then
                echo -e [$(echo "${word#*=}" | tr -d '\"')]
            fi

        done

    fi

    
done <web-logs-raw
